/* global process, Buffer */
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import mysql from 'mysql2/promise'
import multer from 'multer'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT || 4000
const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root:123456@127.0.0.1:3306/OmegaDB'
const databaseName = new URL(DATABASE_URL).pathname.replace(/^\//, '')
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsRoot = path.join(__dirname, '..', 'uploads')
const uploadsDir = path.join(uploadsRoot, 'image')

const SHOULD_FAIL_FAST_DB_INIT =
  process.env.FAIL_FAST_DB_INIT === 'true' || process.env.NODE_ENV === 'production'

async function ensureDatabaseExists() {
  const url = new URL(DATABASE_URL)
  const adminPool = mysql.createPool({
    host: url.hostname,
    user: url.username,
    password: url.password,
    port: url.port ? Number(url.port) : 3306,
    waitForConnections: true,
    connectionLimit: 5,
  })

  await adminPool.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
  await adminPool.end()
}

const pool = mysql.createPool(DATABASE_URL)
let databaseState = 'starting' // starting | ready | error
let databaseInitError = null

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

const SESSION_COOKIE_NAME = 'omega_session'
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev_omega_secret_change_me'
const DEFAULT_SESSION_TTL_MS = 1000 * 60 * 60 * 8
const REMEMBER_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7

function base64UrlEncode(value) {
  return Buffer.from(value).toString('base64url')
}

function base64UrlDecode(value) {
  return Buffer.from(value, 'base64url').toString('utf8')
}

function signValue(value) {
  return crypto.createHmac('sha256', SESSION_SECRET).update(value).digest('base64url')
}

function createSessionToken(payload) {
  const encoded = base64UrlEncode(JSON.stringify(payload))
  const signature = signValue(encoded)
  return `${encoded}.${signature}`
}

function safeEqual(a, b) {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return crypto.timingSafeEqual(aBuf, bBuf)
}

function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null
  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) return null
  const expected = signValue(encoded)
  if (!safeEqual(signature, expected)) return null

  try {
    const payload = JSON.parse(base64UrlDecode(encoded))
    if (!payload || typeof payload !== 'object') return null
    if (typeof payload.exp !== 'number' || payload.exp <= Date.now()) return null
    if (!payload.id || !payload.role) return null
    return payload
  } catch {
    return null
  }
}

function parseCookies(cookieHeader) {
  const header = cookieHeader || ''
  if (!header) return {}
  return header.split(';').reduce((acc, part) => {
    const index = part.indexOf('=')
    if (index === -1) return acc
    const key = part.slice(0, index).trim()
    const value = part.slice(index + 1).trim()
    acc[key] = decodeURIComponent(value)
    return acc
  }, {})
}

function getSession(req) {
  const cookies = parseCookies(req.headers.cookie)
  const token = cookies[SESSION_COOKIE_NAME]
  const payload = verifySessionToken(token)
  if (!payload) return null
  return { id: payload.id, role: payload.role, name: payload.name, email: payload.email }
}

function requireAuth(req, res, next) {
  const session = getSession(req)
  if (!session) return res.status(401).json({ error: 'Not authenticated.' })
  req.user = session
  next()
}

function requireAdmin(req, res, next) {
  const session = getSession(req)
  if (!session) return res.status(401).json({ error: 'Not authenticated.' })
  if (session.role !== 'admin') return res.status(403).json({ error: 'Admin access required.' })
  req.user = session
  next()
}

async function initDatabase() {
  await ensureDatabaseExists()
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `)

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS roles (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      name ENUM('admin','user') NOT NULL,
      description VARCHAR(255) DEFAULT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY unique_role_name (name)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `)

  await pool.execute(`
    INSERT IGNORE INTO roles (name, description) VALUES
      ('admin', 'Administrator with full access'),
      ('user', 'Regular user with limited access')
  `)

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash CHAR(64) NOT NULL,
      role_id INT UNSIGNED NOT NULL DEFAULT 2,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `)

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      excerpt TEXT NOT NULL,
      image_url VARCHAR(512) DEFAULT '',
      published_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `)

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS images (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      image_name VARCHAR(255) NOT NULL,
      image_path VARCHAR(512) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY unique_image_path (image_path)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `)

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS members (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      logo VARCHAR(255) NOT NULL,
      company_name VARCHAR(255) NOT NULL,
      website_url VARCHAR(512) NOT NULL,
      status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
      added_on DATE NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY unique_company_name (company_name)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `)

  const [roleIdRows] = await pool.query('SELECT id FROM roles WHERE name = ?', ['admin'])
  const adminRoleId = roleIdRows[0]?.id || 1
  const [userRoleRows] = await pool.query('SELECT id FROM roles WHERE name = ?', ['user'])
  const userRoleId = userRoleRows[0]?.id || 2

  const [userRoleColumn] = await pool.query("SHOW COLUMNS FROM users LIKE 'role_id'")
  if (userRoleColumn.length === 0) {
    await pool.execute(`ALTER TABLE users ADD COLUMN role_id INT UNSIGNED NOT NULL DEFAULT ${userRoleId}`)
    await pool.execute('ALTER TABLE users ADD CONSTRAINT fk_users_role_id FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT ON UPDATE CASCADE')
    await pool.execute('UPDATE users SET role_id = ? WHERE role_id IS NULL', [userRoleId])
  }

  const [existingAdmin] = await pool.query('SELECT id FROM users WHERE email = ?', ['admin@omegafarm.com'])
  if (existingAdmin.length === 0) {
    const passwordHash = hashPassword('Password123!')
    await pool.execute(
      'INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, ?)',
      ['Admin User', 'admin@omegafarm.com', passwordHash, adminRoleId]
    )
  }

  const [existingMuzammil] = await pool.query('SELECT id FROM users WHERE email = ?', ['muzammil@omegafarm.com'])
  if (existingMuzammil.length === 0) {
    const passwordHash = hashPassword('123456')
    await pool.execute(
      'INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, ?)',
      ['Muzammil Admin', 'muzammil@omegafarm.com', passwordHash, adminRoleId]
    )
  }

  const [imageColumns] = await pool.query("SHOW COLUMNS FROM images LIKE 'created_at'")
  if (imageColumns.length === 0) {
    await pool.execute(
      'ALTER TABLE images ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'
    )
  }

  await pool.execute(`
    INSERT INTO members (logo, company_name, website_url, status, added_on)
    VALUES
      ('unilever.png', 'Unilever', 'https://www.unilever.pk/', 'Active', '2025-05-28'),
      ('haleeb.jpeg', 'Haleeb', 'https://haleebfoods.com/', 'Active', '2025-05-28'),
      ('pakola.png', 'Pakola', 'https://pakola.com.pk/', 'Active', '2025-05-28'),
      ('nestle.png', 'Nestle', 'https://www.nestle.pk/', 'Active', '2025-05-28'),
      ('dalda.png', 'Dalda', 'https://www.daldafoods.com/', 'Active', '2025-05-28'),
      ('gourment.png', 'Gourmet Foods', 'https://www.gourmetfoods.pk/', 'Active', '2025-05-28'),
      ('adams.jpeg', 'Adam''s', 'https://www.adams.pk/', 'Active', '2025-05-28'),
      ('fauji.png', 'Fauji Foods', 'https://www.faujifoods.com/', 'Active', '2025-05-28'),
      ('dairyland.jpeg', 'Dairyland', 'https://www.dairylandltd.com/', 'Active', '2025-05-28'),
      ('fries.png', 'FrieslandCampina', 'https://www.frieslandcampina.com/pk/', 'Active', '2025-05-28'),
      ('tetra.jpeg', 'Tetra Pak', 'https://www.tetrapak.com/en-pk', 'Active', '2025-05-28'),
      ('shak.png', 'Shakarganj', 'https://shakarganjfood.com/', 'Active', '2025-05-28')
    ON DUPLICATE KEY UPDATE
      logo = VALUES(logo),
      website_url = VALUES(website_url),
      status = VALUES(status),
      added_on = VALUES(added_on)
  `)
}

async function ensureUploadsDirectory() {
  await fs.mkdir(uploadsDir, { recursive: true })
}

async function uploadImagesFromFolder() {
  await ensureUploadsDirectory()
  const files = await fs.readdir(uploadsDir)
  const insertPromises = files.map(async (file) => {
    const dbPath = `uploads/image/${file}`
    return pool.execute(
      'INSERT IGNORE INTO images (image_name, image_path) VALUES (?, ?)',
      [file, dbPath]
    )
  })

  await Promise.all(insertPromises)
  return files
}

await ensureUploadsDirectory()

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const timestamp = Date.now()
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '-')
    cb(null, `${timestamp}-${safeName}`)
  },
})
const upload = multer({ storage })

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use('/uploads', express.static(uploadsRoot))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.send('Omega backend is running. Use /api/status or /api/contact.')
})

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Node backend connected',
    database: {
      state: databaseState,
      error: databaseInitError ? databaseInitError.message : null,
    },
  })
})

app.use((req, res, next) => {
  if (!req.path.startsWith('/api/')) return next()

  // Allow basic session checks / logout even if the DB is down, so the app can
  // render a helpful state instead of getting a proxy ECONNREFUSED.
  const noDbPaths = new Set(['/api/status', '/api/me', '/api/logout'])
  if (noDbPaths.has(req.path)) return next()

  if (databaseState === 'ready') return next()

  return res.status(503).json({
    error: 'Database is not ready.',
    state: databaseState,
    details: databaseInitError ? databaseInitError.message : 'Database initialization is still running.',
    hint: 'Ensure MySQL is running and set DATABASE_URL (e.g. mysql://user:pass@127.0.0.1:3306/OmegaDB).',
  })
})

app.get('/api/me', requireAuth, (req, res) => {
  return res.json({ success: true, user: req.user })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all fields.' })
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    )

    console.log('Contact request saved:', { id: result.insertId, name, email, message })

    return res.json({
      success: true,
      message: 'Thanks! Your message was received successfully.',
      id: result.insertId,
    })
  } catch (error) {
    console.error('Database error:', error)
    return res.status(500).json({ error: 'Unable to save message to database.' })
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password, remember } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password.' })
  }

  try {
    const [rows] = await pool.execute(
      `SELECT users.id, users.name, users.email, users.password_hash, roles.name AS role
       FROM users
       JOIN roles ON users.role_id = roles.id
       WHERE users.email = ?`,
      [email]
    )

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const user = rows[0]
    const passwordHash = hashPassword(password)

    if (user.password_hash !== passwordHash) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const ttlMs = remember ? REMEMBER_SESSION_TTL_MS : DEFAULT_SESSION_TTL_MS
    const token = createSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      exp: Date.now() + ttlMs,
    })

    res.cookie(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: ttlMs,
      path: '/',
    })

    return res.json({
      success: true,
      message: 'Login successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ error: 'Unable to process login request.' })
  }
})

app.post('/api/logout', (req, res) => {
  res.clearCookie(SESSION_COOKIE_NAME, { path: '/' })
  return res.json({ success: true, message: 'Logged out.' })
})

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required.' })
  }

  try {
    const [existingUsers] = await pool.execute('SELECT id FROM users WHERE email = ?', [email])
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email already exists. Please login instead.' })
    }

    const [roleRows] = await pool.execute('SELECT id FROM roles WHERE name = ?', ['user'])
    const userRoleId = roleRows[0]?.id || 2
    const passwordHash = hashPassword(password)
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, ?)',
      [name, email, passwordHash, userRoleId]
    )

    console.log('User signed up:', { id: result.insertId, name, email, role_id: userRoleId })

    return res.json({
      success: true,
      message: 'Account created successfully. Please login.',
      user: {
        id: result.insertId,
        name,
        email,
        role: 'user',
      },
    })
  } catch (error) {
    console.error('Signup error:', error)
    return res.status(500).json({ error: 'Unable to create account.' })
  }
})

app.get('/api/roles', requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, name FROM roles ORDER BY id')
    return res.json({ success: true, roles: rows })
  } catch (error) {
    console.error('Roles error:', error)
    return res.status(500).json({ error: 'Unable to fetch roles.' })
  }
})

app.get('/api/posts', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, excerpt, image_url, published_at, created_at FROM posts ORDER BY published_at DESC, id DESC'
    )
    return res.json({ success: true, posts: rows })
  } catch (error) {
    console.error('Posts error:', error)
    return res.status(500).json({ error: 'Unable to fetch posts.' })
  }
})

app.get('/api/members', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT id, logo, company_name, website_url, status, added_on, created_at, updated_at
       FROM members
       ORDER BY id ASC`
    )
    return res.json({ success: true, members: rows })
  } catch (error) {
    console.error('Fetch members error:', error)
    return res.status(500).json({ error: 'Unable to fetch members.' })
  }
})

app.post('/api/members', requireAdmin, async (req, res) => {
  const { logo, company_name, website_url, status, added_on } = req.body

  if (!logo || !company_name || !website_url || !status || !added_on) {
    return res.status(400).json({ error: 'Logo, company name, website URL, status, and added date are required.' })
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO members (logo, company_name, website_url, status, added_on) VALUES (?, ?, ?, ?, ?)',
      [logo, company_name, website_url, status, added_on]
    )
    return res.json({ success: true, message: 'Member created.', memberId: result.insertId })
  } catch (error) {
    console.error('Create member error:', error)
    return res.status(500).json({ error: 'Unable to create member.' })
  }
})

app.put('/api/members/:id', requireAdmin, async (req, res) => {
  const memberId = req.params.id
  const { logo, company_name, website_url, status, added_on } = req.body

  if (!logo || !company_name || !website_url || !status || !added_on) {
    return res.status(400).json({ error: 'Logo, company name, website URL, status, and added date are required.' })
  }

  try {
    await pool.execute(
      'UPDATE members SET logo = ?, company_name = ?, website_url = ?, status = ?, added_on = ? WHERE id = ?',
      [logo, company_name, website_url, status, added_on, memberId]
    )
    return res.json({ success: true, message: 'Member updated.' })
  } catch (error) {
    console.error('Update member error:', error)
    return res.status(500).json({ error: 'Unable to update member.' })
  }
})

app.delete('/api/members/:id', requireAdmin, async (req, res) => {
  const memberId = req.params.id
  try {
    await pool.execute('DELETE FROM members WHERE id = ?', [memberId])
    return res.json({ success: true, message: 'Member deleted.' })
  } catch (error) {
    console.error('Delete member error:', error)
    return res.status(500).json({ error: 'Unable to delete member.' })
  }
})

app.post('/api/posts', requireAdmin, async (req, res) => {
  const { title, excerpt, image_url, published_at } = req.body

  if (!title || !excerpt) {
    return res.status(400).json({ error: 'Title and excerpt are required.' })
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO posts (title, excerpt, image_url, published_at) VALUES (?, ?, ?, ?)',
      [title, excerpt, image_url || '', published_at || new Date()]
    )
    return res.json({ success: true, message: 'Post created.', postId: result.insertId })
  } catch (error) {
    console.error('Create post error:', error)
    return res.status(500).json({ error: 'Unable to create post.' })
  }
})

app.post('/api/upload-image', requireAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided.' })
    }

    const dbPath = `uploads/image/${req.file.filename}`
    await pool.execute(
      'INSERT IGNORE INTO images (image_name, image_path) VALUES (?, ?)',
      [req.file.originalname, dbPath]
    )

    return res.json({
      success: true,
      message: 'Image uploaded successfully.',
      image_url: `/${dbPath.replace(/\\/g, '/')}`,
      fileName: req.file.filename,
    })
  } catch (error) {
    console.error('Image upload error:', error)
    return res.status(500).json({ error: 'Unable to upload image.' })
  }
})

app.put('/api/posts/:id', requireAdmin, async (req, res) => {
  const postId = req.params.id
  const { title, excerpt, image_url, published_at } = req.body

  if (!title || !excerpt) {
    return res.status(400).json({ error: 'Title and excerpt are required.' })
  }

  try {
    await pool.execute(
      'UPDATE posts SET title = ?, excerpt = ?, image_url = ?, published_at = ? WHERE id = ?',
      [title, excerpt, image_url || '', published_at || new Date(), postId]
    )
    return res.json({ success: true, message: 'Post updated.' })
  } catch (error) {
    console.error('Update post error:', error)
    return res.status(500).json({ error: 'Unable to update post.' })
  }
})

app.delete('/api/posts/:id', requireAdmin, async (req, res) => {
  const postId = req.params.id
  try {
    await pool.execute('DELETE FROM posts WHERE id = ?', [postId])
    return res.json({ success: true, message: 'Post deleted.' })
  } catch (error) {
    console.error('Delete post error:', error)
    return res.status(500).json({ error: 'Unable to delete post.' })
  }
})

app.get('/api/users', requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT users.id, users.name, users.email, roles.name AS role, users.created_at
       FROM users
       JOIN roles ON users.role_id = roles.id
       ORDER BY users.id DESC`
    )
    return res.json({ success: true, users: rows })
  } catch (error) {
    console.error('Fetch users error:', error)
    return res.status(500).json({ error: 'Unable to fetch users.' })
  }
})

app.post('/api/users', requireAdmin, async (req, res) => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Name, email, password and role are required.' })
  }

  try {
    const [existingUsers] = await pool.execute('SELECT id FROM users WHERE email = ?', [email])
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email already exists.' })
    }

    const [roleRows] = await pool.execute('SELECT id FROM roles WHERE name = ?', [role])
    if (roleRows.length === 0) {
      return res.status(400).json({ error: 'Role not found.' })
    }

    const roleId = roleRows[0].id
    const passwordHash = hashPassword(password)
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, ?)',
      [name, email, passwordHash, roleId]
    )

    return res.json({
      success: true,
      message: 'User created.',
      user: {
        id: result.insertId,
        name,
        email,
        role,
      },
    })
  } catch (error) {
    console.error('Create user error:', error)
    return res.status(500).json({ error: 'Unable to create user.' })
  }
})

app.put('/api/users/:id', requireAdmin, async (req, res) => {
  const userId = req.params.id
  const { name, email, role, password } = req.body

  if (!name || !email || !role) {
    return res.status(400).json({ error: 'Name, email and role are required.' })
  }

  try {
    const [existingUsers] = await pool.execute('SELECT id FROM users WHERE email = ? AND id <> ?', [email, userId])
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email already exists.' })
    }

    const [roleRows] = await pool.execute('SELECT id FROM roles WHERE name = ?', [role])
    if (roleRows.length === 0) {
      return res.status(400).json({ error: 'Role not found.' })
    }
    const roleId = roleRows[0].id

    const nextPassword = typeof password === 'string' ? password.trim() : ''
    if (nextPassword) {
      const passwordHash = hashPassword(nextPassword)
      await pool.execute(
        'UPDATE users SET name = ?, email = ?, role_id = ?, password_hash = ? WHERE id = ?',
        [name, email, roleId, passwordHash, userId]
      )
    } else {
      await pool.execute('UPDATE users SET name = ?, email = ?, role_id = ? WHERE id = ?', [name, email, roleId, userId])
    }
    return res.json({ success: true, message: 'User updated.' })
  } catch (error) {
    console.error('Update user error:', error)
    return res.status(500).json({ error: 'Unable to update user.' })
  }
})

app.delete('/api/users/:id', requireAdmin, async (req, res) => {
  const userId = req.params.id
  try {
    await pool.execute('DELETE FROM users WHERE id = ?', [userId])
    return res.json({ success: true, message: 'User deleted.' })
  } catch (error) {
    console.error('Delete user error:', error)
    return res.status(500).json({ error: 'Unable to delete user.' })
  }
})

app.get('/api/images', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, image_name, image_path, created_at FROM images ORDER BY id'
    )

    const images = rows.map((row) => ({
      ...row,
      image_url: `/${row.image_path.replace(/\\/g, '/')}`,
    }))

    return res.json({ success: true, images })
  } catch (error) {
    console.error('Fetch images error:', error)
    return res.status(500).json({ error: 'Unable to fetch images from the database.' })
  }
})

app.post('/api/upload-images', requireAdmin, async (req, res) => {
  try {
    const files = await uploadImagesFromFolder()
    return res.json({
      success: true,
      uploaded: files.length,
      files,
      message: 'Images uploaded to database successfully.',
    })
  } catch (error) {
    console.error('Upload images error:', error)
    return res.status(500).json({ error: 'Unable to upload images to database.' })
  }
})

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found.' })
  }
  next()
})

app.use((err, req, res, next) => {
  console.error('Server error:', err)
  if (req.path.startsWith('/api/')) {
    return res.status(500).json({ error: err.message || 'Server error.' })
  }
  next(err)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

initDatabase()
  .then(() => {
    databaseState = 'ready'
    console.log('Database initialized.')
  })
  .catch((error) => {
    databaseState = 'error'
    databaseInitError = error
    console.error('Failed to initialize database:', error)
    if (SHOULD_FAIL_FAST_DB_INIT) process.exit(1)
  })

/* global process */
import 'dotenv/config'
import crypto from 'crypto'
import mysql from 'mysql2/promise'

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

function parseArgs(argv) {
  const args = { _: [] }
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (!arg) continue
    if (!arg.startsWith('--')) {
      args._.push(arg)
      continue
    }
    const key = arg.slice(2)
    const next = argv[i + 1]
    if (!next || next.startsWith('--')) {
      args[key] = true
      continue
    }
    args[key] = next
    i += 1
  }
  return args
}

async function ensureSchemaExists(pool) {
  const [roles] = await pool.query("SHOW TABLES LIKE 'roles'")
  const [users] = await pool.query("SHOW TABLES LIKE 'users'")
  if (roles.length === 0 || users.length === 0) {
    throw new Error(
      "Database schema not found. Start the backend once (`npm run dev:backend`) to initialize tables, then re-run this command."
    )
  }
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2))

  const name = parsed.name || parsed.n || 'Admin'
  const email = parsed.email || parsed.e || parsed._[0]
  const password = parsed.password || parsed.p || parsed._[1]
  const updateExisting = Boolean(parsed.update || parsed.force)
  const databaseUrl =
    parsed['database-url'] ||
    parsed.databaseUrl ||
    process.env.DATABASE_URL ||
    'mysql://root:123456@127.0.0.1:3306/OmegaDB'

  if (!email || !password) {
    console.error(
      [
        'Usage:',
        '  npm run create-admin -- --email admin@example.com --password "NewPassword123!" --name "Admin User"',
        '  node server/scripts/createAdminUser.js admin@example.com "NewPassword123!" --name "Admin User"',
        '',
        'Options:',
        '  --update     Update role/password if the user already exists',
        '  --database-url mysql://user:pass@host:3306/OmegaDB',
      ].join('\n')
    )
    process.exit(2)
  }

  const pool = mysql.createPool(databaseUrl)
  try {
    await ensureSchemaExists(pool)

    const [roleRows] = await pool.execute('SELECT id FROM roles WHERE name = ?', ['admin'])
    const adminRoleId = roleRows[0]?.id
    if (!adminRoleId) {
      throw new Error("Admin role not found in `roles` table.")
    }

    const [existingRows] = await pool.execute('SELECT id FROM users WHERE email = ?', [email])
    const passwordHash = hashPassword(password)

    if (existingRows.length > 0) {
      if (!updateExisting) {
        console.error(
          `User already exists for ${email}. Re-run with --update to set role=admin and update password.`
        )
        process.exit(1)
      }

      const userId = existingRows[0].id
      await pool.execute(
        'UPDATE users SET name = ?, password_hash = ?, role_id = ? WHERE id = ?',
        [name, passwordHash, adminRoleId, userId]
      )
      console.log(`Admin user updated: ${email}`)
      return
    }

    await pool.execute(
      'INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, ?)',
      [name, email, passwordHash, adminRoleId]
    )
    console.log(`Admin user created: ${email}`)
  } finally {
    await pool.end()
  }
}

main().catch((error) => {
  console.error('Failed to create admin user:', error?.message || error)
  process.exit(1)
})

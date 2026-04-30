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

async function main() {
  const parsed = parseArgs(process.argv.slice(2))

  const email = parsed.email || parsed.e || parsed._[0]
  const password = parsed.password || parsed.p || parsed._[1]
  const databaseUrl =
    parsed['database-url'] ||
    parsed.databaseUrl ||
    process.env.DATABASE_URL ||
    'mysql://root:123456@127.0.0.1:3306/OmegaDB'

  if (!email || !password) {
    console.error(
      [
        'Usage:',
        '  npm run reset-password -- --email user@example.com --password "NewPassword123!"',
        '  node server/scripts/resetPassword.js user@example.com "NewPassword123!"',
        '',
        'Optional:',
        '  --database-url mysql://user:pass@host:3306/OmegaDB',
      ].join('\n')
    )
    process.exit(2)
  }

  const pool = mysql.createPool(databaseUrl)
  try {
    const passwordHash = hashPassword(password)
    const [result] = await pool.execute(
      'UPDATE users SET password_hash = ? WHERE email = ?',
      [passwordHash, email]
    )

    const changedRows = Number(result?.changedRows ?? 0)
    const affectedRows = Number(result?.affectedRows ?? 0)

    if (affectedRows === 0) {
      console.error(`No user found with email: ${email}`)
      process.exit(1)
    }

    if (changedRows === 0) {
      console.log(`Password hash already set for: ${email}`)
      return
    }

    console.log(`Password updated for: ${email}`)
  } finally {
    await pool.end()
  }
}

main().catch((error) => {
  console.error('Failed to reset password:', error?.message || error)
  process.exit(1)
})

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const folderPath = path.join(__dirname, '..', 'uploads', 'image')

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'OmegaDB',
})

async function uploadImages() {
  try {
    const files = await fs.readdir(folderPath)

    for (const file of files) {
      const dbPath = `uploads/image/${file}`
      await db.execute(
        'INSERT IGNORE INTO images (image_name, image_path) VALUES (?, ?)',
        [file, dbPath]
      )
      console.log('Inserted:', file)
    }
  } catch (err) {
    console.error('Error uploading images:', err)
  } finally {
    await db.end()
  }
}

uploadImages()

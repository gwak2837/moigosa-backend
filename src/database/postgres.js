import { dirname } from 'path'
import postgres from 'pg'
import { fileURLToPath } from 'url'
import { importSQL, sleep } from '../utils/common.js'

const { Pool } = postgres

const __dirname = dirname(fileURLToPath(import.meta.url))

const users = importSQL(__dirname, 'sql/users.sql')
const userByEmail = importSQL(__dirname, 'sql/userByEmail.sql')

export const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
})

export async function poolQuery(query, values) {
  return pool.query(query, values).catch((error) => {
    throw new Error(error)
  })
}

export async function connectDatabase() {
  while (true) {
    try {
      await pool.query('SELECT NOW() as now')
      console.log('Connected to the PostgreSQL server')
      break
    } catch (error) {
      await sleep(5000)
      console.warn(error)
    }
  }
}

export async function getUserList() {
  const conn = await connectToMariaDB()

  const rows = await conn.query(await users)

  if (conn) conn.end()
  return rows
}

export async function getUserByEmail(email) {
  const rows = await poolQuery(await userByEmail, [email])

  if (conn) conn.end()
  return rows
}

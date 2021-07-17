import { promises } from 'fs'
import { join } from 'path'

export async function importSQL(dirname, filename) {
  return (await promises.readFile(join(dirname, filename), 'utf-8')).replace(/\s+/gi, ' ')
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

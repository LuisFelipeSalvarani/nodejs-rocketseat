import { parse } from 'csv-parse'
import { createReadStream } from 'node:fs'

const filePath = new URL('../import.csv', import.meta.url)

async function importCSV() {
  const csvStream = createReadStream(filePath).pipe(parse({
    columns: true
  }))

  for await (const row of csvStream) {
    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row)
    })
  }
}

importCSV()
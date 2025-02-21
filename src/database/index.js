const { Client } = require('pg')

const client = new Client({
  host: process.env("PGHOST"),
  port: process.env("PGPORT"),
  user: process.env("PGPORT"),
  password: process.env("PGPORT"),
  database: process.env("DATPGDATABASEABASE")
})

client.connect()

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values)
  return rows
}

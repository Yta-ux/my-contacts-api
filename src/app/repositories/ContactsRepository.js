// const { v4: uuidv4 } = require('uuid');
const db = require('../../database');

class ContactsRepository {

  async findAll(orderBy) {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const rows = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      ORDER BY contacts.name ${direction}`)

    return rows
  }

  async findById(id) {
    const row = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1
      `, [id])

    return row[0]
  }

  async findByEmail(email) {
    const row = await db.query(`
      SELECT * FROM contacts
      WHERE email = $1
      `, [email])

    return row[0]
  }

  async deleteById(id) {
    await db.query(`
      DELETE FROM contacts
      WHERE id = $1
    `, [id])
  }

  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`, [name, email, phone, category_id])

    return row
  }

  async update(id, { name, email, phone }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3
      WHERE id = $4
      RETURNING *
      `, [name, email, phone, id])

    return row
  }
}

module.exports = new ContactsRepository()

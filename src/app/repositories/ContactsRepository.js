const { v4: uuidv4 } = require('uuid');

let contacts = [
  { id: uuidv4(), name: 'João Silva', email: 'joao.silva@example.com', phone: '123456789', category_id: uuidv4() },
  { id: uuidv4(), name: 'Maria Oliveira', email: 'maria.oliveira@example.com', phone: '987654321', category_id: uuidv4() },
  { id: uuidv4(), name: 'Pedro Santos', email: 'pedro.santos@example.com', phone: '456123789', category_id: uuidv4() },
  { id: uuidv4(), name: 'Ana Costa', email: 'ana.costa@example.com', phone: '321654987', category_id: uuidv4() },
  { id: uuidv4(), name: 'Carlos Lima', email: 'carlos.lima@example.com', phone: '654987321', category_id: uuidv4() },
  { id: uuidv4(), name: 'Fernanda Souza', email: 'fernanda.souza@example.com', phone: '789123456', category_id: uuidv4() }
];

class ContactsRepository {

  findAll() {
    return new Promise((resolve) => { resolve(contacts) });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find(contact => contact.id === id))
    })
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find(contact => contact.email === email))
    })
  }

  deleteById(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter(contact => contact.id !== id)
      resolve()
    })
  }

  create({ name, email, phone }) {
    return new Promise((resolve) => {
      const newContact = { id: uuidv4(), name, email, phone, category_id: uuidv4() }
      contacts.push(newContact)
      resolve(newContact)
    })

  }

  update(id, { name, email, phone }) {
    return new Promise((resolve) => {
      const contact = contacts.find(contact => contact.id === id)
      const updateContacts = {
        ...contact,
        name: name,
        email: email,
        phone: phone
      }
      contacts = contacts.map(contacts => (
        contacts.id === id ? updateContacts : contacts
      ))
      resolve(updateContacts)
    })

  }
}

module.exports = new ContactsRepository()

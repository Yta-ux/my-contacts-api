const ContactsRepository = require('../repositories/ContactsRepository')

class ContactController {
  async index(request, response) {
    // listar registros
    const orderBy = ['ASC', 'DESC'].includes(String(request.query.orderBy).toUpperCase()) ? request.query.orderBy : 'ASC'
    const contacts = await ContactsRepository.findAll(orderBy)
    return response.json(contacts)
  }

  async show(request, response) {
    // Obter um registro
    const contact = await ContactsRepository.findById(request.params.id)

    if (!contact) {
      return response.status(404).json({ error: 'User not found' })
    }

    return response.json(contact)
  }

  async store(request, response) {
    const { name, email, phone, category_id } = request.body

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    const contactExist = await ContactsRepository.findByEmail(email)

    if (contactExist) {
      return response.status(400).json({ error: 'Email already exists' })
    }

    const contact = await ContactsRepository.create({ name, email, phone, category_id })

    return response.json(contact)
  }

  async update(request, response) {
    // editar um registro
    const { id } = request.params
    const contactExist = await ContactsRepository.findById(id)
    const { name, email, phone } = request.body

    if (!contactExist) {
      return response.status(404).json({ error: 'User not found' })
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    const contactExistByEmail = await ContactsRepository.findByEmail(email)

    if (contactExistByEmail && contactExistByEmail.id !== id) {
      return response.status(400).json({ error: 'Email already exists' })
    }

    const contact = await ContactsRepository.update(id, { name, email, phone })

    return response.json(contact)
  }

  async delete(request, response) {
    // deletar um registro
    const { id } = request.params
    const contact = await ContactsRepository.findById(id)

    if (!contact) {
      return response.status(404).json({ error: 'User not found' })
    }

    await ContactsRepository.deleteById(id)

    return response.sendStatus(204)
  }
}

// Singleton
module.exports = new ContactController()

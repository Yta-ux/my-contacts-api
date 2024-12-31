const CategoriesRepository = require('../repositories/CategoriesRepository')

class CategoryController {
  async index(request, response) {
    const orderBy = ['ASC', 'DESC'].includes(String(request.query.orderBy).toUpperCase()) ? request.query.orderBy : 'ASC'
    const categories = await CategoriesRepository.findAll(orderBy)

    return response.json(categories)
  }

  async store(request, response) {
    const { name } = request.body

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    const categoryExist = await CategoriesRepository.findByName(name)

    if (categoryExist) {
      return response.status(400).json({ error: 'Category already exists' })
    }

    console.log(name)
    const category = await CategoriesRepository.create(name)

    return response.json(category)

  }

  async delete(request, response) {
    const { id } = request.params

    const categoryExist = await CategoriesRepository.findById(id)

    if (!categoryExist) {
      return response.status(404).json({ error: 'Category not found' })
    }

    await CategoriesRepository.delete(id)

    return response.sendStatus(204)

  }

  async update(request, response) {
    const { id } = request.params
    const { name } = request.body

    const categoryExist = await CategoriesRepository.findById(id)

    if (!categoryExist) {
      return response.status(404).json({ error: 'Category not found' })
    }

    const categoryExistByName = await CategoriesRepository.findByName(name)

    if (categoryExistByName) {
      return response.status(400).json({ error: 'Category already exists' })
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    const category = await CategoriesRepository.update(id, name)

    return response.json(category)
  }
}

module.exports = new CategoryController()

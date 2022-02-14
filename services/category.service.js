const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize')

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const category = await models.Category.findAll();
    return category;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id,{
      include: ['products']
    });
    if(!category){
      throw boom.notFound('category not found');
    }
    return category;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const category = await model.update(changes);
    return category;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return {rta:true};
  }

}

module.exports = CategoryService;

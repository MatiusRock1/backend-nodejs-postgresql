const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductsService {

  constructor(){


  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include:['category'],
    }
    const {limit,offset} = query;
    if (limit && offset){
      options.limit = limit;
      options.offset = offset;
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product =  await models.Product.findByPk(id,{
      include: ['category']
    })
    if(!product){
      throw boom.notFound('product not found');
    }

    return product;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const product = await model.update(changes);
    return product;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return {rta:true};
  }

}

module.exports = ProductsService;

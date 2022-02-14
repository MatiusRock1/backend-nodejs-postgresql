const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService{

  constructor(){

  }

  async find(){
    const rta = await models.Customer.findAll({
      include:['user']  //resuelve la relacion de forma anidada
    });
    return rta;
  }

  async findOne(id){
    const user = await models.Customer.findByPk(id,{
      include:['user']  //resuelve la relacion de forma anidada
    });
    if(!user){
      throw boom.notFound('customer not found');
    }
    return user;
  }
  async create(data){
    const newUser =await models.User.create(data.user);
    const newCustomer = await models.Customer.create({
      ...data,
      userId: newUser.id
    });
    return newCustomer;
  }
  async update(id,changes){
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }
  async delete(id){
    const model = await this.findOne(id);
    await model.destroy();
    return {rta:true};
  }

}
module.exports = CustomerService;

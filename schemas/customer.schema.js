const Joi = require('joi');
const {createUserSchema} = require('./user.schema');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer();
const createCustomer = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema,
});

const updatecustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomer, updatecustomerSchema, getCustomerSchema }

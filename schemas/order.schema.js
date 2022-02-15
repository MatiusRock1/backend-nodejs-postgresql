const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const productId = Joi.number().integer();
const amout= Joi.number().integer().min(1);

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const updateOrderSchema = Joi.object({
  customerId
});

const getOrderSchema = Joi.object({
  id: id.required(),
});
const addItemSchema = Joi.object({
  orderId: customerId.required(),
  productId: productId.required(),
  amout: amout.required(),
})



module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema }

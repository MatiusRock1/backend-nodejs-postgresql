
'use strict';

const {OrderproductSchema,ORDER_PRODUCT_TABLE} = require('../models/order-products.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE,OrderproductSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};

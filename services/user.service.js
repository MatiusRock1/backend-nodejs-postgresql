const boom = require('@hapi/boom');

const getConnettion = require('../libs/postgres');

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    const client = await getConnettion();
    const response = await client.query('SELECT * FROM task');
    return response.rows;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;

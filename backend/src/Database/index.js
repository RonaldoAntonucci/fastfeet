import Sequelize from 'sequelize';

import User from '../app/Models/User';
import Admin from '../app/Models/Admin';
import Recipient from '../app/Models/Recipient';

import databaseConfig from '../Config/database';

const models = [User, Recipient, Admin];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(
        model =>
          model && model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();

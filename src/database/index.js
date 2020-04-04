import Sequelize from 'sequelize';
import DatabaseConfig from '../config/DatabaseConfig';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Deliveryman from '../app/models/Deliveryman';
import Delivery from '../app/models/Delivery';
import Restriction from '../app/models/Restriction';
import Problem from '../app/models/Problem';

const models = [
  User,
  Recipient,
  File,
  Deliveryman,
  Delivery,
  Restriction,
  Problem,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(DatabaseConfig);
    models.forEach(model => model.init(this.connection));
    models.forEach(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();

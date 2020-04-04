import Sequelize, { Model } from 'sequelize';

class Restriction extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        day_of_week: Sequelize.INTEGER,
        start_at: Sequelize.STRING,
        end_at: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Restriction;

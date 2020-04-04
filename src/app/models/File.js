import Sequelize, { Model } from 'sequelize';
import ServerConfig from '../../config/ServerConfig';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        filename: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${ServerConfig.APP_URL}/files/${this.filename}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;

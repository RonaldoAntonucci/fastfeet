import Sequelize, { Model } from 'sequelize';
import adress from './Traits/adress';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        ...adress(Sequelize),
      },
      {
        sequelize,
        tableName: 'recipients',
      }
    );

    return this;
  }
}

export default Recipient;

import Sequelize, { Model } from 'sequelize';
import userAttrs from './Traits/userAttrs';

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        avatar_id: Sequelize.STRING,
        ...userAttrs(Sequelize),
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Deliveryman;

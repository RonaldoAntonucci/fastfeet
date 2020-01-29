import Sequelize, { Model } from 'sequelize';

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        avatar_id: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      source: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

export default Deliveryman;

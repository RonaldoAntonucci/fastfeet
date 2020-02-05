import Sequelize, { Model } from 'sequelize';

class Problem extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.TEXT,
      },
      {
        sequelize,
        tableName: 'problems',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Delivery, {
      foreignKey: 'delivery_id',
      source: 'id',
    });

    this.addScope('delivery', {
      include: [
        { model: models.Delivery, include: ['Recipient', 'Deliveryman'] },
      ],
    });
  }
}

export default Problem;

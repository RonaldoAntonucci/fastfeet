import Sequelize, { Model, Op } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        signature_id: Sequelize.STRING,
        product: Sequelize.STRING,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        deletedAt: 'canceledAt',
        scopes: {
          deliverymanId(id) {
            return !id ? {} : { where: { deliveryman_id: id } };
          },
          delivered(is) {
            return is
              ? {
                  where: {
                    end_date: { [Op.ne]: null },
                  },
                }
              : {
                  where: {
                    end_date: null,
                  },
                };
          },
        },
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      source: 'id',
    });
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      source: 'id',
    });
  }
}

export default Delivery;

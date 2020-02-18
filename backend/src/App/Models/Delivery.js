import Sequelize, { Model, Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';

import Recipient from './Recipient';
import Deliveryman from './Deliveryman';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.canceled_at) {
              return 'CANCELADA';
            }
            if (this.end_date) {
              return 'ENTREGUE';
            }
            if (this.start_date) {
              return 'RETIRADA';
            }
            return 'PENDENTE';
          },
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        deletedAt: 'canceledAt',
        scopes: {
          deliveryList: {
            attributes: [
              'id',
              'end_date',
              'status',
              'created_at',
              'updated_at',
              'canceled_at',
            ],
            include: [
              { model: Recipient, attributes: ['name', 'city', 'state'] },
              { model: Deliveryman, attributes: ['name'] },
            ],
          },
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
          withdrawToday: {
            where: {
              start_date: {
                [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
              },
            },
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
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Delivery;

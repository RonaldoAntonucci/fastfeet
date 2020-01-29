import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        isAdmin: {
          type: Sequelize.VIRTUAL,
          get() {
            return !!this.Admin;
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    // eslint-disable-next-line func-names
    this.prototype.toJSON = function() {
      let values = {
        ...this.dataValues,
      };
      values.isAdmin = !!values.Admin;

      delete values.password_hash;
      delete values.password;

      if (values.Admin) delete values.Admin;
      if (values.Deliveryman) {
        values = { ...values, ...values.Deliveryman.dataValues };
        delete values.Deliveryman;
      }

      return values;
    };

    return this;
  }

  static associate(models) {
    this.hasOne(models.Admin, { foreignKey: 'user_id' });
    this.hasOne(models.Deliveryman, { foreignKey: 'user_id' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      street: { type: Sequelize.STRING, allowNull: false },
      number: { type: Sequelize.INTEGER, allowNull: false },
      complement: { type: Sequelize.STRING, allowNull: false },
      state: { type: Sequelize.STRING, allowNull: false },
      city: { type: Sequelize.STRING, allowNull: false },
      zipCode: { type: Sequelize.STRING, allowNull: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('recipients');
  },
};

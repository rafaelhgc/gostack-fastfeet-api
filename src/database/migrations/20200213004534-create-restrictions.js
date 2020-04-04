module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('restrictions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      day_of_week: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start_at: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      end_at: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('restrictions');
  },
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('trucks', { 
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      plate: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
      }, 
      alias: {
          type: Sequelize.STRING,
          allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('trucks');
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('truck_positions', { 
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      truck_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {model: 'trucks', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      }, 
      position: {
          type: Sequelize.GEOMETRY('POINT'),
          allowNull: false
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
    return queryInterface.dropTable('truck_positions');
  }
};

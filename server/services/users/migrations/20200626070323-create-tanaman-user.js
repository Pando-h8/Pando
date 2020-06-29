'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TanamanUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      umur_sekarang: {
        type: Sequelize.INTEGER
      },
      terakhir_disiram: {
        type: Sequelize.DATE
      },
      form: {
        type: Sequelize.STRING
      },
      resistance: {
        type: Sequelize.INTEGER
      },
      gambar: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TanamanUsers');
  }
};
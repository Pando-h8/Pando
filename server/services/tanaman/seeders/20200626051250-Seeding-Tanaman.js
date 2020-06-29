'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tanamans', [
      {
      nama: 'Apple',
      umur: 2,
      gambar: 'SuperAdmin',
      growth_rate: 2,
      resistance: 2,
      createdAt : new Date(),
      updatedAt : new Date()
      },
      {
      nama: 'Mango',
      umur: 2,
      gambar: 'SuperAdmin',
      growth_rate: 2,
      resistance: 2,
      createdAt : new Date(),
      updatedAt : new Date()
      },
      {
      nama: 'Cactus',
      umur: 2,
      gambar: 'SuperAdmin',
      growth_rate: 2,
      resistance: 2,
      createdAt : new Date(),
      updatedAt : new Date()
      },
      {
      nama: 'Palm',
      umur: 2,
      gambar: 'SuperAdmin',
      growth_rate: 2,
      resistance: 2,
      createdAt : new Date(),
      updatedAt : new Date()
      },
  ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tanamans', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

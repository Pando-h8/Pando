'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tanamans', [
      {
      nama: 'Bamboo',
      umur: 10,
      gambar: 'https://cdn.pixabay.com/photo/2013/07/13/12/36/bamboo-159948_960_720.png',
      growth_rate: 5,
      resistance: 10,
      createdAt : new Date(),
      updatedAt : new Date()
      }, 
      {
        nama: 'Rose',
        umur: 10,
        gambar: 'https://cdn.pixabay.com/photo/2019/07/02/06/54/flower-4311652_960_720.png',
        growth_rate: 3,
        resistance: 5,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        nama: 'Palm Tree',
        umur: 50,
        gambar: 'https://cdn.pixabay.com/photo/2014/04/02/10/45/palm-304428_960_720.png',
        growth_rate: 2,
        resistance: 20,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        nama: 'Cactus',
        umur: 40,
        gambar: 'https://cdn.pixabay.com/photo/2019/06/15/22/32/aloe-vera-4276603_960_720.png',
        growth_rate: 3,
        resistance: 30,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        nama: 'Corn',
        umur: 1,
        gambar: 'https://cdn.pixabay.com/photo/2014/03/25/16/23/corn-296956_960_720.png',
        growth_rate: 1,
        resistance: 5,
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

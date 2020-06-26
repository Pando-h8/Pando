'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Tanaman extends Model {

  }

  Tanaman.init({
    nama: DataTypes.STRING,
    umur: DataTypes.INTEGER,
    gambar: DataTypes.STRING,
    growth_rate: DataTypes.INTEGER,
    resistance: DataTypes.INTEGER
  }, {sequelize});
  Tanaman.associate = function(models) {
    // associations can be defined here
  };
  return Tanaman;
};
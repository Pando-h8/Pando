'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TanamanUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TanamanUser.init({
    nama: DataTypes.STRING,
    umur_sekarang: DataTypes.INTEGER,
    terahir_disiram: DataTypes.DATE,
    form: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TanamanUser',
  });
  return TanamanUser;
};
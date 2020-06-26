"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TanamanUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TanamanUser.belongsTo(models.User);
    }
  }
  TanamanUser.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Nama should not be empty",
          },
          notEmpty: {
            msg: "Nama should not be empty",
          },
        },
      },
      umur_sekarang: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Umur Sekarang should not be empty",
          },
          notEmpty: {
            msg: "Umur Sekarang should not be empty",
          },
        },
      },
      terahir_disiram: DataTypes.DATE,
      form: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TanamanUser",
    }
  );
  return TanamanUser;
};

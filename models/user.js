"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product);
      User.hasMany(models.Transaction);

      // //test
      // foreignkey mengacu pada userid di tabel Transaction
      // User.hasMany(models.Transaction, {
      //   foreignKey: { name: "userId" },
      // });
      // User.hasMany(models.Transaction, { foreignKey: { name: "orderId" } });
    }
  }

  User.init(
    {
      fullName: DataTypes.STRING,
      gender: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      location: DataTypes.STRING,
      image: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

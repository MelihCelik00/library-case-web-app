/* eslint-disable require-jsdoc */
'use strict';
const Model = require('sequelize').Model;
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.BookBorrowings);
      User.hasMany(models.BookRatings);
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    paranoid: false,
  });
  return User;
};

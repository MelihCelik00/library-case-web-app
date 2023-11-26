'use strict';
/* eslint-disable require-jsdoc */
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Model {
    static associate(models) {
      // define association here
      Book.hasMany(models.BookRatings);
      Book.hasMany(models.BookBorrowings);
    }
  }
  Book.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Book',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    paranoid: false,
  });
  return Book;
};

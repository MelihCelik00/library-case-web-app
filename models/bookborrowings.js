'use strict';
/* eslint-disable require-jsdoc */
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class BookBorrowings extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'UserId',
      });
      this.belongsTo(models.Book, {
        foreignKey: 'BookId',
      });
    }
  }
  BookBorrowings.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    BookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Book',
        key: 'id',
      },
    },
    isBorrowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isReturned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'BookBorrowings',
    timestamps: true,
    paranoid: false,
  });
  return BookBorrowings;
};

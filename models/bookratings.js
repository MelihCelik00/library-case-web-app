/* eslint-disable require-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookRatings extends Model {
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: 'UserId'});
      this.belongsTo(models.Book, {foreignKey: 'BookId'});
    }
  }
  BookRatings.init({
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
    score: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'BookRatings',
    paranoid: false,
  });
  return BookRatings;
};

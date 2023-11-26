'use strict';


const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const _basename = path.basename;
const join = path.join;
const DataTypes = Sequelize.DataTypes;
const basename = _basename(__filename);
const config = require(__dirname + '/../config/config.js');
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config);

fs.readdirSync(__dirname)
    .filter(function(file) {
      return (
        file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
      );
    })
    .forEach(function(file) {
      const model = require(join(__dirname, file))(sequelize, DataTypes);
      db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

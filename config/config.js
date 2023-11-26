'use strict';
require('dotenv').config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
  // NODE_ENV,
} = process.env;

const options = {
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  dialect: 'postgres',
  seederStorage: 'sequelize',
  define: {
    timestamps: true,
    paranoid: true,
  },
};

// if (NODE_ENV !== 'local') {
//   options.dialectOptions = {
//     ssl: false,
//   };
// }

module.exports = options;

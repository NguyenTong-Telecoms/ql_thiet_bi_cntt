const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ql_thiet_bi','root','', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;

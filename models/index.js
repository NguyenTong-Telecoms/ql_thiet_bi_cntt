const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Import models
const UserModel = require('./User');
const DeviceModel = require('./Device');

// Init models
const User = UserModel(sequelize, DataTypes);
const Device = DeviceModel(sequelize, DataTypes);

// Export
module.exports = {
  sequelize,
  User,
  Device
};

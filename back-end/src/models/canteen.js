const Sequelize = require('sequelize');
const sequelize = require('../database');

const Canteen = sequelize.define('canteens', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Canteen;

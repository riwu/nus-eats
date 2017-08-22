const Sequelize = require('sequelize');
const sequelize = require('../database');
const Canteen = require('./canteen');

const Stall = sequelize.define('stalls', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Stall.belongsTo(Canteen);
Canteen.hasMany(Stall, {onDelete: 'CASCADE'});

module.exports = Stall;

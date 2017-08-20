const Sequelize = require('sequelize');
const sequelize = require('../database');
const Canteen = require('./canteen');

const Store = sequelize.define('stores', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Store.belongsTo(Canteen);
Canteen.hasMany(Store, {onDelete: 'CASCADE'});

module.exports = Store;

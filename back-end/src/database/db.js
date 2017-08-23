const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
const db        = {};

const models_dir = path.join(__dirname, '..', 'models');

fs
.readdirSync(models_dir)
.filter(file => 
  (file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
)
.forEach(file => {
  const model = sequelize.import(path.join(models_dir, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
if (db[modelName].associate) {
  db[modelName].associate(db);
}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync( {force: true} );

module.exports = db;

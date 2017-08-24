module.exports = (sequelize, DataTypes) => {
  const Canteen = sequelize.define('Canteen', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    underscored: true
  });

  Canteen.assoicate = (models) => {
    Canteen.hasMany(models.Stall, { as: 'stalls', onDelete: 'CASCADE' } );
  };

  return Canteen;
}
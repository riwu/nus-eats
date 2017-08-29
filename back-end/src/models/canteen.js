module.exports = (sequelize, DataTypes) => {
  const Canteen = sequelize.define('canteen', {
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
    },
    crowdId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Canteen.assoicate = (models) => {
    Canteen.hasMany(models.stall, { as: 'stalls', onDelete: 'CASCADE' } );
    Canteen.hasMany(models.appointment, { as: 'appointments', onDelete: 'CASCADE' } );
  };

  return Canteen;
}
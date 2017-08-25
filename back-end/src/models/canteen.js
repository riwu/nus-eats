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
    },
    crowd_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true
  });

  Canteen.assoicate = (models) => {
    Canteen.hasMany(models.Stall, { as: 'stalls', onDelete: 'CASCADE' } );
    Canteen.hasMany(models.Appointment, { as: 'appointments', onDelete: 'CASCADE' } );
  };

  return Canteen;
}
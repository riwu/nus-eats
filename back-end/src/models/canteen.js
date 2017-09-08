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
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    }
  });

  Canteen.assoicate = (models) => {
    Canteen.hasMany(models.stall, { onDelete: 'CASCADE' });
    Canteen.hasMany(models.appointment, { onDelete: 'CASCADE' });
  };

  return Canteen;
}
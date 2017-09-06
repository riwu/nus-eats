module.exports = (sequelize, DataTypes) => {
  const Stall = sequelize.define('stall', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    }
  });

  Stall.associate = (models) => {
    Stall.belongsTo(models.canteen, { onDelete: 'CASCADE' });
    Stall.hasMany(models.rating, { onDelete: 'CASCADE' });
    Stall.hasMany(models.photo, { onDelete: 'CASCADE' });
  };

  return Stall;
}

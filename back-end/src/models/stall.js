module.exports = (sequelize, DataTypes) => {
  const Stall = sequelize.define('Stall', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true
  });

  Stall.associate = (models) => {
    Stall.belongsTo(models.Canteen, { onDelete: 'CASCADE' } );
  };

  return Stall;
}

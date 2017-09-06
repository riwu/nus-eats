module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('photo', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Photo.associate = (models) => {
    Photo.belongsTo(models.stall, { onDelete: 'CASCADE' });
  }
  return Photo;
}
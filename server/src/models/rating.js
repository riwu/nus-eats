module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('rating', {
      value: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
          type: DataTypes.STRING,
          allowNull: false
      }
    }, {
      indexes: [{
        unique: true,
        fields: ['userId', 'stallId']
      }]
    });

    Rating.associate = (models) => {
      Rating.belongsTo(models.stall, { onDelete: 'CASCADE' });
    };

    return Rating;
  }
module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
      value: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
          type: DataTypes.STRING,
          allowNull: false
      }
    }, {
      underscored: true
    });
  
    Rating.associate = (models) => {
      Rating.belongsTo(models.Stall, { onDelete: 'CASCADE' } );
    };
  
    return Rating;
  }
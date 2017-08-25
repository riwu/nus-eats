module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      attendees: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          defaultValue: []
      }
    }, {
      underscored: true
    });

    Appointment.associate = (models) => {
        Appointment.belongsTo(models.Canteen, { onDelete: 'CASCADE' } );
    }
  
    return Appointment;
  }
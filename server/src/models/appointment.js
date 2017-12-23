module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('appointment', {
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      attendees: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          defaultValue: []
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      }
    }, {
      paranoid: true
    });

    Appointment.associate = (models) => {
        Appointment.belongsTo(models.canteen, { onDelete: 'CASCADE' });
    }

    return Appointment;
  }
module.exports = function(sequelize, DataTypes) {
  var Walk = sequelize.define("Walk", {
    requestorID: {
        type: DataTypes.STRING,
    },
    volunteerID: {
        type: DataTypes.STRING,
    },
    startLocation: {
        type: DataTypes.STRING,
    },
    endLocation: {
        type: DataTypes.STRING,
    },
    startTime: {
        type: DataTypes.DATE,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
  });
  return Walk;
};

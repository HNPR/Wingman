module.exports = function(sequelize, DataTypes) {
  var Walk = sequelize.define("Walk", {
    // requestorID: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    volunteerID: {
        type: DataTypes.STRING,
    },
    startLocation: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    endLocation: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }
    // created_at: {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    // }
  });

  Walk.associate = function(models) {
    // This says that a walk should belong to a User
    // A Walk cannot be created without a User due to the foreign key contraint
    Walk.belongsTo(models.User, {
        foreignKey: {
            name: "requestorID",
            allowNull: false
        }
    });
  };
  return Walk;
};

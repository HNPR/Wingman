module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    age: {
      type: DataTypes.TINYINT,
      isInt: true,
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 25]
      }
    },
    googleID: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: [1, 100]
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        len: [1, 255]
      }
    },
    profilePhoto: {
      type: DataTypes.TEXT,
      // isUrl: true,
    }
    // created_at: {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    // }
  });

  User.associate = function (models) {
    // Associating User with Walk
    // When a user is deleted, also delete any associated walks
    User.hasMany(models.Walk, {
      onDelete: "cascade",
      onUpdate: "cascade",
      foreignKey: {
        name: "requesterID",
        allowNull: false
      }
    });
  };
  return User;
};
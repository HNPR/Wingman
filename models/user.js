module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    age: {
      type: DataTypes.TINYINT
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 25]
      }
    },
    googleID: {
      type: DataTypes.STRING,
      allowNull: false,
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
        type: DataTypes.TEXT
    }
  });
  return User;
};

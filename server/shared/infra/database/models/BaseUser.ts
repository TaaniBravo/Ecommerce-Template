import bcrypt from "bcryptjs";

module.exports = (sequelize, DataTypes) => {
  const BaseUser = sequelize.define(
    "base_user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      passwordHash: DataTypes.STRING,
      password: {
        type: DataTypes.VIRTUAL,
        set(val: string) {
          // Remember to set the data value, otherwise it won't be validated
          this.setDataValue("password", val);
          this.setDataValue("password_hash", bcrypt.hashSync(val, 10, null));
        },
        validate: {
          containsCriteria: (val: string) => {
            const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            if (val.match(passwordRegex) !== null) {
              throw new Error(
                "Password must contain at least:\n - One Lowercase Letter\n - One Uppercase Letter\n - One Number\n - One Special Character"
              );
            }
          }
        }
      }
    },
    {
      timestamps: true
    }
  );

  BaseUser.prototype.validPassword = function(password: string) {
    return bcrypt.compareSync(password, this.passwordHash);
  };

  return BaseUser;
};

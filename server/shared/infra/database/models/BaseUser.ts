import bcrypt from "bcryptjs";

const BaseUserInit = (sequelize, DataTypes) => {
  const BaseUser = sequelize.define(
    "user",
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
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      passwordHash: DataTypes.STRING,
      password: {
        type: DataTypes.VIRTUAL,
        set: function(val: string) {
          // Remember to set the data value, otherwise it won't be validated
          // this.setDataValue("password", val);
          this.setDataValue("passwordHash", bcrypt.hashSync(val, 10, null));
        },
        is: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
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

export default BaseUserInit;

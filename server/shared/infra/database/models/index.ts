import { Sequelize, DataTypes } from "sequelize";
const env = process.env.NODE_ENV || "development";
import { config } from "../config/config";
import BaseUserInit from "./BaseUser";

let sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    process.env[config[env].use_env_variable],
    config[env]
  );
} else {
  sequelize = new Sequelize(
    config[env].database,
    config[env].username,
    process.env.DB_PASS || config[env].password,
    config[env]
  );
}

export const db = {
  sequelize,
  Sequelize,
  BaseUser: BaseUserInit(sequelize, DataTypes)
};

Object.keys(db).forEach(modelName => {
  if (db[modelName]?.associate) {
    db[modelName].associate(db);
  }
});

console.log(Object.keys(db));

module.exports = db;

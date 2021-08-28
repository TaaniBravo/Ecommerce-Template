import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/config";
import BaseUserInit from "./BaseUser";

export const db = {
  sequelize,
  Sequelize,
  BaseUser: BaseUserInit(sequelize, DataTypes)
};

export default db;

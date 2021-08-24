import sequelize from "../config/config";
import { Sequelize } from "sequelize/types";
import BaseUser from "./BaseUser";
class DB {
  public sequelize: Sequelize;
  private User;

  constructor(sequelize, User) {
    this.sequelize = sequelize;
    this.User = User;
  }
}

export default new DB(sequelize, BaseUser);

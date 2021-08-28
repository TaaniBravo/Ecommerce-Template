import { Sequelize, DataTypes } from "sequelize";
import { Sequelize as SequelizeType } from "sequelize/types";
import sequelize from "../config/config";
import BaseUserInit from "./BaseUser";

class PostgresDB {
  public sequelize: SequelizeType;
  private Sequelize;
  public BaseUser;

  constructor(BaseUser: CallableFunction) {
    this.sequelize = sequelize;
    this.Sequelize = Sequelize;
    this.BaseUser = BaseUser(this.sequelize, DataTypes);
  }
}

export default new PostgresDB(BaseUserInit);

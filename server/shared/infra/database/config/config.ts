import { config as dotenvConfig } from "dotenv";
import { Sequelize } from "sequelize";
import { Sequelize as SequelizeType } from "sequelize/types";
dotenvConfig({ path: "./server/.env" });
const env = process.env.NODE_ENV || "development";

let sequelize: SequelizeType;

switch (env) {
  case "development":
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PW,
      {
        host: "localhost",
        dialect: "postgres",
        port: 5432
      }
    );
    break;
  case "production":
    sequelize = sequelize = new Sequelize(process.env.JAWSDB_URL);
    break;
  case "test":
    sequelize = new Sequelize(
      process.env.TEST_DB,
      process.env.DB_USER,
      process.env.DB_PW,
      {
        host: "localhost",
        dialect: "postgres",
        port: 5432,
        logging: false
      }
    );
    break;
  default:
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PW,
      {
        host: "localhost",
        dialect: "postgres",
        port: 5432
      }
    );

    break;
}

export default sequelize;

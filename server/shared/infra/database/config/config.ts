/* eslint-disable indent */
/* eslint-disable camelcase */
import { config as dotenvConfig } from "dotenv";
import { Sequelize } from "sequelize";

dotenvConfig({ path: "./server/.env" });

// create connection to our db
const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PW,
        {
          host: process.env.DB_HOST,
          dialect: "postgres",
          port: 5432
        }
      );

export default sequelize;

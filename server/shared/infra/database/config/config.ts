/* eslint-disable camelcase */
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: "./server/.env" });

export const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "postgres"
  }
};

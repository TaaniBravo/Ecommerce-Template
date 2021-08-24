/* eslint-disable indent */
/* eslint-disable camelcase */
import { config as dotenvConfig } from "dotenv";
import { Sequelize } from "sequelize";

dotenvConfig({ path: "./server/.env" });

// create connection to our db
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const sequelize = () => {
  switch (true) {
    case process.env.NODE_ENV === "test":
      return new Sequelize(
        process.env.TEST_DB,
        process.env.DB_USER,
        process.env.DB_PW,
        {
          host: process.env.DB_HOST,
          dialect: "postgres",
          port: 5432
        }
      );
    case process.env.NODE_ENV === "production":
      return new Sequelize(process.env.JAWS_DB);
    // Default is set for development.
    default:
      return new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PW,
        {
          host: process.env.DB_HOST,
          dialect: "postgres",
          port: 5432
        }
      );
  }
};

export default sequelize;

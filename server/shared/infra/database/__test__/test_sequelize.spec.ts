/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: "./server/.env" });

describe("Connect to the database", () => {
  it("should connect to the db and check the connection is successful", async () => {
    const Sequelize = require("sequelize");
    const sequelize = new Sequelize(
      process.env.TEST_DB,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres"
      }
    );

    try {
      await sequelize.authenticate();
    } catch (error) {
      throw Error(error.message);
    }
  });
});

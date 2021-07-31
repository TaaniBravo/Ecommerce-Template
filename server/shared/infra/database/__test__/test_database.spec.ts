/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: "./server/.env" });
const db = require("../models/index.ts");

describe("Connect to the database", () => {
  it("should connect to the db and check the connection is successful", async () => {
    try {
      await db.sequelize.authenticate();
    } catch (error) {
      throw Error(error.message);
    }
  });
});

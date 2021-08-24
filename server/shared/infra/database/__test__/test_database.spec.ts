/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: "./server/.env" });
import DB from "../models";

describe("Connect to the database", () => {
  it("should connect to the db and check the connection is successful", async () => {
    try {
      await DB.sequelize.authenticate();
    } catch (error) {
      throw Error(error.message);
    }
  });
});

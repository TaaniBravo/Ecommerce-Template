/* eslint-disable @typescript-eslint/no-var-requires */
process.env.NODE_ENV = "test";
import { expect } from "chai";
// const app from "../../../../server";
const db = require("../../../../shared/infra/database/models");

interface IBaseUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

describe("When I create a user...", () => {
  before(async () => {
    await db.sequelize.sync();
  });

  afterEach(async () => await db.BaseUser.destroy({ truncate: true }));

  describe("with all valid credentials", () => {
    it("A user should be created.", async () => {
      const userObject: IBaseUser = {
        firstName: "test",
        lastName: "test",
        email: "test@test.com",
        password: "testTest123$"
      };
      const user = await db.BaseUser.create(userObject);

      expect(user).to.not.be.null;
    });
  });
});

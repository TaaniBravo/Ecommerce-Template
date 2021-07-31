/* eslint-disable @typescript-eslint/no-var-requires */
process.env.NODE_ENV = "test";
import chai, { expect } from "chai";
const chaiHttp = require("chai-http");
// const app from "../../../../server";
const db = require("../../../../shared/infra/database/models");

// interface IBaseUser {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

chai.use(chaiHttp);
describe("When I create a user...", () => {
  describe("with all valid credentials", () => {
    it("A user should be created.", async () => {
      const user = await db.BaseUser.create({});
      console.log(user);
    });
  });
});

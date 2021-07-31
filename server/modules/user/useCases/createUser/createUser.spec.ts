import { assert, expect, should } from "chai";
import chaiHttp from "chai-http";
import app from "../../../../server";
import User from "../../../../shared/infra/database/models/BaseUser";

chai.use(chaiHttp);
describe("When I create a user...", () => {
  describe("with all valid credentials", () => {
    it("A user should be created.", () => {
      
    });
  });
});

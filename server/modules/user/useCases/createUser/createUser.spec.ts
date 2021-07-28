import { assert, expect, should } from "chai";
import chaiHttp from "chai-http";
import app from "../../../../server";

chai.use(chaiHttp);
describe("When I create a user...", () => {
  describe("with all valid credentials", () => {
    it("A user should be created.", () => {});
  });
});

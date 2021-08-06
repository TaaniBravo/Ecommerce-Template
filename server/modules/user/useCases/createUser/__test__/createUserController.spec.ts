process.env.NODE_ENV = "test";

import chai, { expect, request } from "chai";
import chaiHttp = require("chai-http");
import app from "../../../../../server";
import db from "../../../../../shared/infra/database/models";

chai.use(chaiHttp);

before(async () => {
  await db.sequelize.sync();
});

describe("When a request is sent to ./api/user", () => {
  describe("I should receive valid credentials for...", () => {
    beforeEach;

    it("First Name", done => {
      request(app)
        .post("/api/user")
        .type("form")
        .send({
          firstName: "firstName",
          lastName: "lastName",
          email: "test@test.com",
          password: "testTest123$"
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    // it("Last Name", () => {});
    // it("Email", () => {});
    // it("Password", () => {});
  });
});

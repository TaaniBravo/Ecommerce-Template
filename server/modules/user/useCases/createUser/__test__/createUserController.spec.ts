process.env.NODE_ENV = "test";

import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../../../server";
import db from "../../../../../shared/infra/database/models";

chai.use(chaiHttp);

before(async () => {
  await db.sequelize.sync();
});

afterEach(async () => await db.BaseUser.destroy({ truncate: true }));

describe("When a request is sent to ./api/user", () => {
  describe("with valid credentials", () => {
    it("it should send back the new user.", done => {
      chai
        .request(app)
        .post("/api/user")
        .type("json")
        .send({
          firstName: "firstName",
          lastName: "lastName",
          email: "test@test.com",
          password: "testTest123$"
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.firstName).to.exist;
          expect(res.body.lastName).to.exist;
          expect(res.body.email).to.exist;
          done();
        });
    });
    // it("Last Name", () => {});
    // it("Email", () => {});
    // it("Password", () => {});
  });
});

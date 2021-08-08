process.env.NODE_ENV = "test";

import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import chaiAsPromised from "chai-as-promised";
import app from "../../../../../server";
import db from "../../../../../shared/infra/database/models";

chai.use(chaiHttp);
chai.use(chaiAsPromised);

type UserObject = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const sendChaiRequest = (userObject: UserObject) => {
  try {
    return chai
      .request(app)
      .post("/api/user")
      .type("json")
      .send(userObject);
  } catch (error) {
    return error;
  }
};

before(async () => {
  await db.sequelize.sync();
  await db.BaseUser.destroy({ truncate: true });
});

describe("When a request is sent to ./api/user", () => {
  describe("with valid credentials", () => {
    afterEach(async () => await db.BaseUser.destroy({ truncate: true }));
    it("it should send back the new user.", done => {
      const userObject: UserObject = {
        firstName: "firstName",
        lastName: "lastName",
        email: "test@test.com",
        password: "testTest123$"
      };

      sendChaiRequest(userObject).end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.firstName).to.exist;
        expect(res.body.lastName).to.exist;
        expect(res.body.email).to.exist;
        done();
      });
    });
  });

  describe("but the email is already used in the db", () => {
    before(async () => {
      const userObject: UserObject = {
        firstName: "firstName",
        lastName: "lastName",
        email: "test@test.com",
        password: "testTest123$"
      };

      await db.BaseUser.create(userObject);
    });

    it("we should not create another user", () => {
      try {
        const userObject: UserObject = {
          firstName: "firstName",
          lastName: "lastName",
          email: "test@test.com",
          password: "testTest123$"
        };

        sendChaiRequest(userObject, expect(err).to.not.be.null);
      } catch (error) {
        console.error(error.message);
      }
    });
  });
});

process.env.NODE_ENV = "test";

import { expect } from "chai";
import DB from "../../../../../shared/infra/database/models";
import UserObject from "../../../UserObject.type";

before(async () => {
  await DB.sequelize.sync();
  await DB.User.destroy({ truncate: true });
});

describe("When I try to create a user...", () => {
  afterEach(async () => await DB.User.destroy({ truncate: true }));

  describe("with all valid credentials", () => {
    it("A user should be created.", async () => {
      const userObject: UserObject = {
        firstName: "test",
        lastName: "test",
        email: "test@test.com",
        password: "testTest123$"
      };
      const user = await DB.User.create(userObject);

      expect(user).to.not.be.null;
    });
  });

  describe("with the following invalid credentials...", () => {
    it("No first name", async () => {
      try {
        const userObject: UserObject = {
          firstName: "",
          lastName: "test",
          email: "test@test.com",
          password: "testTest123$"
        };

        const user = await DB.User.create(userObject);
        expect(user).to.be.null;
      } catch (error) {
        expect(error).to.not.be.null;
      }
    });

    it("No last name", async () => {
      try {
        const userObject: UserObject = {
          firstName: "test",
          lastName: "",
          email: "test@test.com",
          password: "testTest123$"
        };

        const user = await DB.User.create(userObject);
        expect(user).to.be.null;
      } catch (error) {
        expect(error).to.not.be.null;
      }
    });

    it("A invalid email", async () => {
      try {
        const userObject: UserObject = {
          firstName: "test",
          lastName: "test",
          email: "testemail",
          password: "testTest123$"
        };

        const user = await DB.User.create(userObject);
        expect(user).to.be.null;
      } catch (error) {
        expect(error).to.not.be.null;
      }
    });

    it("A invalid password", async () => {
      try {
        const userObject: UserObject = {
          firstName: "test",
          lastName: "test",
          email: "testemail",
          password: "password"
        };

        const user = await DB.User.create(userObject);
        expect(user).to.be.null;
      } catch (error) {
        expect(error).to.not.be.null;
      }
    });
  });

  describe("but if the email is already used in the db", () => {
    before(async () => {
      const userObject: UserObject = {
        firstName: "firstName",
        lastName: "lastName",
        email: "test@test.com",
        password: "testTest123$"
      };

      await DB.User.create(userObject);
    });

    it("db should not create another user", async () => {
      try {
        const userObject: UserObject = {
          firstName: "firstName",
          lastName: "lastName",
          email: "test@test.com",
          password: "testTest123$"
        };

        await DB.User.create(userObject);
      } catch (error) {
        expect(error).to.not.be.null;
      }
    });
  });
});

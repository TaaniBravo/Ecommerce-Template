import { Request, Response, NextFunction } from "express";
import db from "../../../../shared/infra/database/models";

"use strict";

class CreateUserController {
  constructor() {
    this.createUser = this.createUser.bind(this);
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await db.BaseUser.create({
        firstName: "firstName",
        lastName: "lastName",
        email: "test@test.com",
        password: "testTest123$"
      });

      res.status(200).json(newUser);

      next();
    } catch (err) {
      res.status(500).json({ error: err.errors[0] });
    }
  }
}

export default new CreateUserController();

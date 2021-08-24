import { Request, Response, NextFunction } from "express";
import DB from "../../../../shared/infra/database/models";

"use strict";

class CreateUserController {
  constructor() {
    this.createUser = this.createUser.bind(this);
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password } = req.body;

      const newUser = await DB.User.create({
        firstName,
        lastName,
        email,
        password
      });

      res.status(200).json(newUser);

      next();
    } catch (err) {
      res.status(500).json({ error: err.errors[0] });
    }
  }
}

export default new CreateUserController();

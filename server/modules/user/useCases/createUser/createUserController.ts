import { Request, Response, NextFunction } from "express";

"use strict";

class CreateUserController {
  constructor() {
    this.createUser = this.createUser.bind(this);
  }

  createUser(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);

    res.status(200);

    next();
  }
}

export default new CreateUserController();

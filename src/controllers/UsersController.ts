import { Request, Response } from "express";
import { db } from "../models/index.js";
const User = db.user;

class UsersController {
  async create(req: Request, res: Response) {
    try {
      const user = await User.create(req.body);
      res.send(user);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to create the user: " + err,
      });
    }
  }
}
export default new UsersController();

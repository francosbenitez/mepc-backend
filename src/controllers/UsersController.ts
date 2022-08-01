import { Request, Response } from "express";
import { db } from "../models/index.js";
const User = db.user;

class UsersController {
  async create(req: Request, res: Response) {
    try {
      const user = await User.create(req.body);
      return res.json({ user, msg: "Successfully create user" });
    } catch (e) {
      return res.json({ msg: e, status: 500, route: "/create" });
    }
  }
}
export default new UsersController();

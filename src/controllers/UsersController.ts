import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const User = prisma.users;

class UsersController {
  async create(req: Request, res: Response) {
    try {
      const user = await User.create({ data: req.body });
      res.send(user);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to create the user: " + err,
      });
    }
  }
}
export default new UsersController();

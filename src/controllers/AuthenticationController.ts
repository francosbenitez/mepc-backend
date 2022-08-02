import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const User = prisma.users;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

function jwtSignUser(user: any) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, "secret", {
    expiresIn: ONE_WEEK,
  });
}

class AuthenticationController {
  async register(req: Request, res: Response) {
    try {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({ data: req.body });
      const userJson = JSON.parse(JSON.stringify(user));
      console.log("userJson", userJson);
      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      res.status(400).send({
        error: "err: " + err,
      });
    }
  }
}

export default new AuthenticationController();

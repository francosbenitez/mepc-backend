import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const User = prisma.users;
const Role = prisma.roles;
import Constants from "../utils/constants";
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
      // console.log("userJson", userJson);
      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });

      const userRole = await Role.findUnique({
        where: { name: Constants.ROLE_AUTHENTICATED },
      });

      await prisma.roles_users.create({
        data: {
          role: {
            connect: {
              id: userRole?.id,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } catch (err) {
      res.status(400).send({
        error: "err: " + err,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(403).send({
          error: "The login information was incorrect",
        });
      }

      if (user) {
        const equals = bcrypt.compareSync(password, user.password);
        if (equals) {
          const userJson = JSON.parse(JSON.stringify(user));
          res.send({
            user: userJson,
            token: jwtSignUser(userJson),
          });
        } else {
          res.json({ error: "An error has ocurred with user and/or password" });
        }
      } else {
        res.json({ error: "An error has ocurred with user and/or password" });
      }
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to log in",
      });
    }
  }
}

export default new AuthenticationController();

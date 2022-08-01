import { Request, Response } from "express";
import { db } from "../models/index.js";
const Role = db.role;

class RolesController {
  async create(req: Request, res: Response) {
    try {
      const role = await Role.create(req.body);
      res.send(role);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to create the role: " + err,
      });
    }
  }
}
export default new RolesController();

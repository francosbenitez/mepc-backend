import { Request, Response } from "express";
import { db } from "../models/index.js";
const Comment = db.comment;

class CommentsController {
  async create(req: Request, res: Response) {
    try {
      const comment = await Comment.create(req.body);
      res.send(comment);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to create the comment: " + err,
      });
    }
  }
}
export default new CommentsController();

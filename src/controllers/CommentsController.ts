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

  async index(req: Request, res: Response) {
    try {
      const comments = await Comment.findAll({
        include: ["article"],
      });
      res.send(comments);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to get the comments: " + err,
      });
    }
  }
}
export default new CommentsController();

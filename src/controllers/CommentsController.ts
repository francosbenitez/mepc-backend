import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const Comment = prisma.comments;

class CommentsController {
  async create(req: Request, res: Response) {
    try {
      console.log("req.user", req.user);
      const articleId = parseInt(req.params.articleId);
      const { name, text } = req.body;
      const comment = await Comment.create({
        data: {
          name: name,
          text: text,
          authorId: 1,
          articleId: articleId,
        },
      });
      res.send(comment);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to create the comment: " + err,
      });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const comments = await Comment.findMany({
        include: {
          article: true,
        },
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

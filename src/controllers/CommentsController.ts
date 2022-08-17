import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { IGetUserAuthInfoRequest } from "../types/custom";
const prisma = new PrismaClient();
const Comment = prisma.comments;

class CommentsController {
  async create(req: IGetUserAuthInfoRequest, res: Response) {
    try {
      const articleId = parseInt(req.params.articleId);
      const { name, text } = req.body;
      const comment = await Comment.create({
        data: {
          name: name,
          text: text,
          userId: req.user?.id,
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

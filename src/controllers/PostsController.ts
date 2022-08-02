import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const Post = prisma.posts;

class PostsController {
  async index(req: Request, res: Response) {
    try {
      // const authorId = req.query.author;
      let posts = [];

      // if (authorId) {
      //   posts = await Post.findMany({
      //     where: {
      //       authorId: authorId,
      //     },
      //   });
      // } else {
      posts = await Post.findMany();
      // }

      res.send(posts);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to get the posts: " + err,
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const article = await Post.create({ data: req.body });
      res.send(article);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to create the article: " + err,
      });
    }
  }
}

export default new PostsController();

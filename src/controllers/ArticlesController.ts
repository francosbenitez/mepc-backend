import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const Article = prisma.articles;

class ArticlesController {
  async index(req: Request, res: Response) {
    try {
      const authorId =
        req.query && typeof req.query.author === "string"
          ? parseInt(req.query.author)
          : "";
      let articles = [];

      if (authorId) {
        console.log("authorId", authorId);
        articles = await Article.findMany({
          where: {
            authorId: authorId,
          },
        });
      } else {
        articles = await Article.findMany();
      }

      res.send(articles);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to get the articles: " + err,
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const article = await Article.create({ data: req.body });
      res.send(article);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to create the article: " + err,
      });
    }
  }
}

export default new ArticlesController();

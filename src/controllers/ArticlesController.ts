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

      let page =
        req.query && typeof req.query.page === "string"
          ? parseInt(req.query.page)
          : 1;

      if (authorId) {
        articles = await Article.findMany({
          skip: 10 * (page - 1),
          take: 10,
          where: {
            authorId: authorId,
          },
        });
      } else {
        articles = await Article.findMany({
          skip: 10 * (page - 1),
          take: 10,
          include: {
            tags: {
              select: {
                tag: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        });
      }

      res.send({
        data: articles,
        current_page: page,
      });
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

  async show(req: Request, res: Response) {
    try {
      const articleId = parseInt(req.params.articleId);
      const article = await Article.findUnique({
        where: {
          id: articleId,
        },
        include: {
          comment: true,
        },
      });
      res.send(article);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to get the article: " + err,
      });
    }
  }
}

export default new ArticlesController();

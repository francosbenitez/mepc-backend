import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const Article = prisma.articles;

class ArticlesController {
  async index(req: Request, res: Response) {
    try {
      const userId =
        req.query && typeof req.query.user === "string"
          ? parseInt(req.query.user)
          : "";
      let articles = [];

      let page =
        req.query && typeof req.query.page === "string"
          ? parseInt(req.query.page)
          : 1;

      if (userId) {
        articles = await Article.findMany({
          skip: 10 * (page - 1),
          take: 10,
          where: {
            published: true,
            userId: userId,
          },
        });
      } else {
        articles = await Article.findMany({
          skip: 10 * (page - 1),
          take: 10,
          where: {
            published: true,
          },
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
        error:
          "An error has ocurred trying to get the published articles: " + err,
      });
    }
  }

  async indexAll(req: Request, res: Response) {
    try {
      const userId =
        req.query && typeof req.query.user === "string"
          ? parseInt(req.query.user)
          : "";
      let articles = [];

      let page =
        req.query && typeof req.query.page === "string"
          ? parseInt(req.query.page)
          : 1;

      if (userId) {
        articles = await Article.findMany({
          skip: 10 * (page - 1),
          take: 10,
          where: {
            userId: userId,
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
        error: "An error has ocurred trying to get all the articles: " + err,
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

  async publish(req: Request, res: Response) {
    try {
      const articleId = parseInt(req.params.articleId);
      const article = await Article.update({
        where: {
          id: articleId,
        },
        data: {
          published: true,
        },
      });
      res.send(article);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to update the article: " + err,
      });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const articleSlug = req.params.articleSlug;
      const article = await Article.findUnique({
        where: {
          slug: articleSlug,
        },
        select: {
          id: true,
          slug: true,
          title: true,
          content: true,
          published: true,
          user: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
          comment: {
            select: {
              id: true,
              name: true,
              text: true,
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
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

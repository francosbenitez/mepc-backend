import { Request, Response } from "express";
import { db } from "../models/index.js";
const Article = db.article;

class ArticlesController {
  async index(req: Request, res: Response) {
    try {
      const authorId = req.query.author;
      let articles = [];

      if (authorId) {
        articles = await Article.findAll({
          where: {
            authorId: authorId,
          },
        });
      } else {
        articles = await Article.findAll();
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
      const article = await Article.create(req.body);
      res.send(article);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to create the article: " + err,
      });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { articleId } = req.params;
      const article = await Article.findByPk(articleId, {
        include: ["comments"],
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

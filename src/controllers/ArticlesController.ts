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
    } catch (e) {
      return res.json({ msg: e, status: 500, route: "/index" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const article = await Article.create(req.body);
      return res.json({ article, msg: "Successfully create article" });
    } catch (e) {
      return res.json({ msg: e, status: 500, route: "/create" });
    }
  }
}
export default new ArticlesController();

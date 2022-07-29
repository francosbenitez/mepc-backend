import { Request, Response } from "express";
import { db } from "../models/index.js";
const Article = db.article;

class ArticlesController {
  async index(req: Request, res: Response) {
    const articles = await Article.findAll();
    res.send(articles);
  }
}
export default new ArticlesController();

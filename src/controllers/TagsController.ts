import { Request, Response } from "express";
import { db } from "../models/index.js";
const Tag = db.tag;
const Article = db.article;

class TagsController {
  async index(req: Request, res: Response) {
    try {
      const tags = await Tag.findAll({
        include: [
          {
            model: Article,
            as: "articles",
            attributes: ["id", "title", "content"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.send(tags);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to get the tags: " + err,
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const tag = await Tag.create(req.body);
      res.send(tag);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to create the tag: " + err,
      });
    }
  }

  async addArticle(req: Request, res: Response) {
    try {
      const { tagId, articleId } = req.params;
      const tag = await Tag.findByPk(tagId);
      const article = await Article.findByPk(articleId);
      await tag.addArticle(article);
      res.send(tag);
    } catch (err) {
      res.status(500).send({
        error:
          "An error has ocurred trying to add an article to the tag: " + err,
      });
    }
  }
}
export default new TagsController();

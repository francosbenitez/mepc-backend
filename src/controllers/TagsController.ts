import { Request, Response } from "express";
import { db } from "../models/index.js";
const Tag = db.tag;
const Article = db.article;

class TagsController {
  async index(req: Request, res: Response) {
    try {
      const tags = Tag.findAll({
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
}
export default new TagsController();

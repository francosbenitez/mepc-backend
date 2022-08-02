import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// const Article = prisma.articles;
const Tag = prisma.tags;
const TagsArticles = prisma.tags_articles;

class TagsController {
  async index(req: Request, res: Response) {
    try {
      const tags = await Tag.findMany({
        include: {
          articles: {
            select: {
              article: {
                select: {
                  id: true,
                  title: true,
                  content: true,
                },
              },
            },
          },
        },
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
      const tag = await Tag.create({ data: req.body });
      res.send(tag);
    } catch (err) {
      res.status(500).send({
        error: "An error has ocurred trying to create the tag: " + err,
      });
    }
  }

  async addArticle(req: Request, res: Response) {
    try {
      const tagId = parseInt(req.params.tagId);
      const articleId = parseInt(req.params.articleId);
      const articleAdded = await TagsArticles.create({
        data: { tagId, articleId },
      });
      res.send(articleAdded);
    } catch (err) {
      res.status(500).send({
        error:
          "An error has ocurred trying to add an article to the tag: " + err,
      });
    }
  }
}
export default new TagsController();

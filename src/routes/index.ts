import ArticlesController from "../controllers/ArticlesController.js";
import UsersController from "../controllers/UsersController.js";
import TagsController from "../controllers/TagsController.js";
import CommentsController from "../controllers/CommentsController.js";
import express from "express";
const router = express.Router();

router.get("/articles", ArticlesController.index);
router.post("/articles", ArticlesController.create);
router.get("/articles/1", ArticlesController.show);

router.post("/users", UsersController.create);

router.get("/tags", TagsController.index);
router.post("/tags", TagsController.create);
router.post("/tags/:tagId/:articleId", TagsController.addArticle);

router.post("/comments", CommentsController.create);
router.get("/comments", CommentsController.index);

export default router;

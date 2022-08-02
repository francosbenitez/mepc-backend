import express from "express";
const router = express.Router();
import ArticlesController from "../controllers/ArticlesController";
import UsersController from "../controllers/UsersController";
import CommentsController from "../controllers/CommentsController";
import TagsController from "../controllers/TagsController";

router.post("/users", UsersController.create);

router.get("/articles", ArticlesController.index);
router.post("/articles", ArticlesController.create);
router.get("/articles/:articleId", ArticlesController.show);

router.post("/comments", CommentsController.create);
router.get("/comments", CommentsController.index);

router.get("/tags", TagsController.index);
router.post("/tags", TagsController.create);
// router.post("/tags/:tagId/:articleId", TagsController.addArticle);

export default router;

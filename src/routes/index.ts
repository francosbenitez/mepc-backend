import express from "express";
const router = express.Router();
import ArticlesController from "../controllers/ArticlesController";
import UsersController from "../controllers/UsersController";
import CommentsController from "../controllers/CommentsController";

router.post("/users", UsersController.create);

router.get("/articles", ArticlesController.index);
router.post("/articles", ArticlesController.create);
router.get("/articles/:articleId", ArticlesController.show);

router.post("/comments", CommentsController.create);
router.get("/comments", CommentsController.index);

export default router;

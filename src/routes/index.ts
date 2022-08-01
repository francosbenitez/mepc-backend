import ArticlesController from "../controllers/ArticlesController.js";
import UsersController from "../controllers/UsersController.js";
import TagsController from "../controllers/TagsController.js";
import express from "express";
const router = express.Router();

router.get("/articles", ArticlesController.index);
router.post("/articles", ArticlesController.create);

router.post("/users", UsersController.create);

router.get("/tags", TagsController.index);
router.post("/tags", TagsController.create);

export default router;

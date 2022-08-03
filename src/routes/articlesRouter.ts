import express from "express";
import ArticlesController from "../controllers/ArticlesController";
import isAuthenticated from "../policies/isAuthenticated";

const router = express.Router();

router.get("/articles", isAuthenticated, ArticlesController.index);
router.post("/articles", ArticlesController.create);
router.get("/articles/:articleId", ArticlesController.show);

export default router;

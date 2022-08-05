import express from "express";
import ArticlesController from "../controllers/ArticlesController";
// import isAuthenticated from "../policies/isAuthenticated";
// import Constants from "../utils/constants";
// import canAccess from "../middlewares/canAccess";

const router = express.Router();

router.get("/articles");
router.post("/articles", ArticlesController.create);
router.get("/articles/:articleId", ArticlesController.show);

export default router;

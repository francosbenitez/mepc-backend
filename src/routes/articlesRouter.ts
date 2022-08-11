import express from "express";
import ArticlesController from "../controllers/ArticlesController";
import isAuthenticated from "../policies/isAuthenticated";
import canAccess from "../middlewares/canAccess";
import Constants from "../utils/constants";

const router = express.Router();

router.get("/articles", ArticlesController.index);
router.post(
  "/articles",
  isAuthenticated,
  canAccess(Constants.PERMISSION_UPLOAD_ARTICLES),
  ArticlesController.create
);
router.get("/articles/:articleId", ArticlesController.show);

export default router;

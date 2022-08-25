import express from "express";
import ArticlesController from "../controllers/ArticlesController";
import isAuthenticated from "../policies/isAuthenticated";
import canAccess from "../middlewares/canAccess";
import Constants from "../utils/constants";

const router = express.Router();

router.get("/articles", ArticlesController.index);
router.get(
  "/admin/articles",
  isAuthenticated,
  canAccess(Constants.PERMISSION_PUBLISH_ARTICLES),
  ArticlesController.indexAll
);
router.post(
  "/articles",
  isAuthenticated,
  canAccess(Constants.PERMISSION_UPLOAD_ARTICLES),
  ArticlesController.create
);
router.get("/articles/:articleSlug", ArticlesController.show);
router.put(
  "/articles/:articleId/publish",
  isAuthenticated,
  canAccess(Constants.PERMISSION_PUBLISH_ARTICLES),
  ArticlesController.publish
);

export default router;

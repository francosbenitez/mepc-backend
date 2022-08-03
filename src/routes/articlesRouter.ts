import express from "express";
import ArticlesController from "../controllers/ArticlesController";
import isAuthenticated from "../policies/isAuthenticated";
import Constants from "../utils/constants";
import canAccess from "../middlewares/canAccess";

const router = express.Router();

router.get(
  "/articles",
  isAuthenticated,
  canAccess(Constants.PERMISSION_VIEW_ALL_USERS),
  ArticlesController.index
);
router.post("/articles", ArticlesController.create);
router.get("/articles/:articleId", ArticlesController.show);

export default router;

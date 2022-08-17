import express from "express";
import CommentsController from "../controllers/CommentsController";
import isAuthenticated from "../policies/isAuthenticated";

const router = express.Router();

router.post(
  "/articles/:articleId/comments",
  isAuthenticated,
  CommentsController.create
);
router.get("/comments", CommentsController.index);

export default router;

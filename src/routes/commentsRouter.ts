import express from "express";
import CommentsController from "../controllers/CommentsController";

const router = express.Router();

router.post("/comments", CommentsController.create);
router.get("/comments", CommentsController.index);

export default router;

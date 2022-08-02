import express from "express";
const router = express.Router();
import PostsController from "../controllers/PostsController";

router.get("/posts", PostsController.index);

export default router;

import ArticlesController from "../controllers/ArticlesController.js";
import express from "express";
const router = express.Router();

router.get("/articles", ArticlesController.index);

export default router;

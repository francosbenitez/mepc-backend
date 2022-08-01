import ArticlesController from "../controllers/ArticlesController.js";
import express from "express";
const router = express.Router();

router.get("/articles", ArticlesController.index);
router.post("/articles", ArticlesController.create);

export default router;

import express from "express";
import TagsController from "../controllers/TagsController";

const router = express.Router();

router.get("/tags", TagsController.index);
router.post("/tags", TagsController.create);
router.post("/tags/:tagId/:articleId", TagsController.addArticle);

export default router;

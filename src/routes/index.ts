import express from "express";
const router = express.Router();
import ArticlesController from "../controllers/ArticlesController";
import UsersController from "../controllers/UsersController";

router.post("/users", UsersController.create);

router.get("/articles", ArticlesController.index);
router.post("/articles", ArticlesController.create);

export default router;

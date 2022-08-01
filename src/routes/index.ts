import ArticlesController from "../controllers/ArticlesController.js";
import UsersController from "../controllers/UsersController.js";
import express from "express";
const router = express.Router();

router.get("/articles", ArticlesController.index);
router.post("/articles", ArticlesController.create);

router.post("/users", UsersController.create);

export default router;

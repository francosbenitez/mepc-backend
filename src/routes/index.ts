import express from "express";
const router = express.Router();
import PostsController from "../controllers/PostsController";
import UsersController from "../controllers/UsersController";

router.post("/users", UsersController.create);

router.get("/posts", PostsController.index);
router.post("/posts", PostsController.create);

export default router;

import express from "express";
import AuthenticationController from "../controllers/AuthenticationController";
import AuthenticationControllerPolicy from "../policies/AuthenticationControllerPolicy";
import isAuthenticated from "../policies/isAuthenticated";
import canAccess from "../middlewares/canAccess";
import Constants from "../utils/constants";

const router = express.Router();

router.post(
  "/register",
  AuthenticationControllerPolicy.register,
  AuthenticationController.register
);
router.post("/login", AuthenticationController.login);
router.get(
  "/users",
  isAuthenticated,
  canAccess(Constants.PERMISSION_VIEW_ALL_USERS),
  AuthenticationController.index
);

export default router;

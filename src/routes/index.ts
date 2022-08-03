import express from "express";
// import { sendErrorResponse } from "../utils/sendResponse";
import articlesRouter from "./articlesRouter";
import authRouter from "./authRouter";
import commentsRouter from "./commentsRouter";
import tagsRouter from "./tagsRouter";

export default (app: any) => {
  // app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/api", authRouter);
  app.use("/api", articlesRouter);
  app.use("/api", commentsRouter);
  app.use("/api", tagsRouter);

  // app.all('*', (req, res) => sendErrorResponse(res, 404, 'Route does not exist'));
};

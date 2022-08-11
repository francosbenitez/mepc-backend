import express from "express";
import { sendErrorResponse } from "../utils/sendResponse";
import articlesRouter from "./articlesRouter";
import authRouter from "./authRouter";
import commentsRouter from "./commentsRouter";
import tagsRouter from "./tagsRouter";
import cors from "cors";

export default (app: any) => {
  app.use(express.json());
  app.use(cors());

  app.use("/api", authRouter);
  app.use("/api", articlesRouter);
  app.use("/api", commentsRouter);
  app.use("/api", tagsRouter);

  app.all("*", (req: any, res: any) =>
    sendErrorResponse(res, 404, "Route does not exist")
  );
};

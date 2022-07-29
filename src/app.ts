import "./config/env.js";
import express from "express";
import { db } from "./models/index.js";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import routes from "./routes/index.js";

const postsDirectory = path.join(process.cwd(), "contents");

const getPostData = async (id: any) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
};

const test = getPostData("test");

(async () => {
  console.log(await test);
})();

console.log("hello world");

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/api/", routes);

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});

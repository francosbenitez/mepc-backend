import "./config/env";
import express from "express";
import { db } from "./models";

const app = express();
const PORT = process.env.PORT || 8080;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});

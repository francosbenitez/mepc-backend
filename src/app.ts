import "./config/env.js";
import express from "express";
// import { db } from "./models/index.js";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});

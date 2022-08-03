import express from "express";
import routes from "./routes";
import "./policies/passport";

const app = express();

app.use(express.json());
app.use("/api/", routes);

app.listen(8080, () =>
  console.log(`
🚀 Server ready at: http://localhost:8080`)
);

import express from "express";
import "./policies/passport";
import route from "./routes";

const app = express();

route(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);

import express from "express";
import "./policies/passport";
import route from "./routes";
import cors from "cors";

const app = express();

app.use(cors());

route(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);

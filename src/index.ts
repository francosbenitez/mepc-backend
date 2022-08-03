import express from "express";
// import routes from "./routes";
import "./policies/passport";
import route from "./routes";

const app = express();

// app.use("/api/", routes);
route(app);

const port = 8080;

app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
);

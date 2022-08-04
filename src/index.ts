import express from "express";
// import routes from "./routes";
import "./policies/passport";
import route from "./routes";

const app = express();

// app.use("/api/", routes);
route(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);

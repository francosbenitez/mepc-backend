import * as dotenv from "dotenv";

const env = process.env.NODE_ENV;

console.log(`Testing for: ${env}`);

try {
  switch (env) {
    case "undefined":
      Error(
        "Environment undefined, if local in terminal: export NODE_ENV=development"
      );
      break;
    case "dev":
      dotenv.config({
        path: "src/config/dev.env",
      });
      break;
    case "prod":
      dotenv.config({
        path: "src/config/prod.env",
      });
      console.log("process.env.HOST", process.env.HOST);
      break;
    default:
      Error("Unrecognized Environment");
  }
} catch (err) {
  Error("Error trying to run file");
}

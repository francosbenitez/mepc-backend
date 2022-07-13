import dotenv from "dotenv";

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
        path: `${__dirname}/dev.env`,
      });
      break;
    case "prod":
      dotenv.config({
        path: `${__dirname}/prod.env`,
      });
      break;
    default:
      Error("Unrecognized Environment");
  }
} catch (err) {
  Error("Error trying to run file");
}

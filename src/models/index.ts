import { Sequelize, Dialect } from "sequelize";
import config from "../config";
import { Database } from "../types";
import { User } from "./User";

export const db: Database = {};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT as Dialect,
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = User(sequelize, Sequelize);

// module.exports = db;

import { Sequelize, Dialect } from "sequelize";
import config from "../config";
import { DB } from "../types";

const db: DB = {};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT as Dialect,
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

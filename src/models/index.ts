import { Sequelize, Dialect } from "sequelize";
import config from "../config/index.js";
import { Database } from "../types";
import { User } from "./User.js";
import { Article } from "./Article.js";

export const db: Database = {};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT as Dialect,
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = User(sequelize, Sequelize);
db.article = Article(sequelize, Sequelize);

db.article.belongsTo(db.user, {
  foreignKey: "authorId",
  as: "user",
});

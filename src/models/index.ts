import { Sequelize, Dialect } from "sequelize";
import config from "../config/index.js";
import { Database } from "../types";
import { User } from "./User.js";
import { Article } from "./Article.js";
import { Tag } from "./Tag.js";
import { Comment } from "./Comment.js";

export const db: Database = {};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT as Dialect,
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = User(sequelize, Sequelize);
db.article = Article(sequelize, Sequelize);
db.comment = Comment(sequelize, Sequelize);
db.tag = Tag(sequelize, Sequelize);

db.article.belongsTo(db.user, {
  foreignKey: "authorId",
  as: "user",
});

db.article.belongsToMany(db.tag, {
  through: "article_tag",
  as: "tags",
  foreignKey: "article_id",
});

db.tag.belongsToMany(db.article, {
  through: "article_tag",
  as: "articles",
  foreignKey: "tag_id",
});

db.article.hasMany(db.comment, { as: "comments" });
db.comment.belongsTo(db.article, {
  foreignKey: "articleId",
  as: "article",
});

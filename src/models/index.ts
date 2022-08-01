import { Sequelize, Dialect } from "sequelize";
import config from "../config/index.js";
import { Database } from "../types";
import { User } from "./User.js";
import { Article } from "./Article.js";
import { Tag } from "./Tag.js";
import { Comment } from "./Comment.js";
import { Role } from "./Role.js";

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
db.role = Role(sequelize, Sequelize);

// O-M
db.article.belongsTo(db.user, {
  foreignKey: "authorId",
  as: "user",
});

// M-M
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

// M-M
db.role.belongsToMany(db.user, {
  through: "user_role",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_role",
  foreignKey: "userId",
  otherKey: "roleId",
});
db.ROLES = ["admin", "user"];

// O-M
db.article.hasMany(db.comment, { as: "comments" });
db.comment.belongsTo(db.article, {
  foreignKey: "articleId",
  as: "article",
});

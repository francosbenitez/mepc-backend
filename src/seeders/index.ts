import { db } from "../models/index";

db.sequelize.sync({ force: true }).then(async function () {
  db.user.create({
    username: "francosbenitez",
    email: "francosbenitez@gmail.com",
    password: "f1r2a3n4",
  });

  db.user.create({
    username: "lucaseromero",
    email: "lucaseromero@gmail.com",
    password: "l1u2c3a4s5",
  });

  db.article.create({
    title: "My First Article",
    content: "<p>Hello world from My First Article</p>",
    authodId: 1,
  });

  db.article.create({
    title: "My Second Article",
    content: "<p>Hello world from My Second Article</p>",
    authodId: 2,
  });

  db.comment.create({
    name: "name",
    text: "text",
    articleId: 1,
  });

  db.comment.create({
    name: "name",
    text: "text",
    articleId: 2,
  });

  db.tag.create({
    name: "aba",
  });
});

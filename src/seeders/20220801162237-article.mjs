"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Articles",
      [
        {
          title: "My First Article",
          content: "<p>Hello world from My First Article</p>",
          authorId: 1,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Articles", null, {});
  },
};

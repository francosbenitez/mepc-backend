export const Article = (sequelize: any, Sequelize: any) => {
  const Article = sequelize.define("article", {
    title: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      required: true,
      allowNull: false,
      default: Date.now(),
    },
    author: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
  });

  return Article;
};

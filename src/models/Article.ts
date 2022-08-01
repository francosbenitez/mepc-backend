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
  });

  return Article;
};

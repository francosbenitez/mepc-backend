export const Comment = (sequelize: any, Sequelize: any) => {
  const Comment = sequelize.define("comment", {
    name: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
  });

  return Comment;
};

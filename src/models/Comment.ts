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
    date: {
      type: Sequelize.DATE,
      required: true,
      allowNull: false,
      default: Date.now(),
    },
  });

  return Comment;
};

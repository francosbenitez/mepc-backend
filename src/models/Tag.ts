export const Tag = (sequelize: any, Sequelize: any) => {
  const Tag = sequelize.define("tag", {
    name: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
  });

  return Tag;
};

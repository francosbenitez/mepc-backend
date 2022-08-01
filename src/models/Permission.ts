export const Permission = (sequelize: any, Sequelize: any) => {
  const Permission = sequelize.define("permission", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return Permission;
};

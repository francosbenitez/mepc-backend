export const Role = (sequelize: any, Sequelize: any) => {
  const Role = sequelize.define("role", {
    name: {
      type: Sequelize.STRING,
    },
  });

  return Role;
};
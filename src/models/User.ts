export const User = (sequelize: any, Sequelize: any) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
  });

  return User;
};

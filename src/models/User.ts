export const User = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    // username: {
    //   type: Sequelize.STRING,
    //   unique: true,
    // },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: Sequelize.STRING,
  });

  return User;
};

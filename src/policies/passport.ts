const passport = require("passport");
// const db = require("./models");
// const config = require("./config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// const User = db.user;
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const User = prisma.users;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    async function (jwtPayload: any, done: any) {
      try {
        const user = await User.findUnique({
          where: {
            id: jwtPayload.id,
          },
        });
        if (!user) {
          return done(new Error(), false);
        }
        return done(null, user);
      } catch (err) {
        return done(new Error(), false);
      }
    }
  )
);

// module.exports = null;

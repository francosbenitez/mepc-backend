import passport from "passport";
import passportJwt from "passport-jwt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const User = prisma.users;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

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

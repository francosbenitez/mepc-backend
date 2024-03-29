import passport from "passport";
import type { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  passport.authenticate("jwt", function (err, user) {
    if (err || !user) {
      res.status(403).send({
        error: "You do not have access to this resource",
      });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
}

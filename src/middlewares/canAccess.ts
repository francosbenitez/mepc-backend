import { sendErrorResponse } from "../utils/sendResponse";
import { PrismaClient } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();
const Permission = prisma.permissions;
// const Role = prisma.roles;

export default (permission: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const access = await Permission.findUnique({
      where: { name: permission },
      include: {
        roles: {
          select: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        // {
        //   attributes: ["id", "name"],
        //   model: Role,
        //   as: "roles",
        //   through: { attributes: [] },
        // },
      },
    });
    if (await req.userData.hasPermissionTo(access)) {
      return next();
    }
    console.error("You do not have the authorization to access this.");
    return sendErrorResponse(
      res,
      403,
      "You do not have the authorization to access this"
    );
  };

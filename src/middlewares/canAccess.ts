import { sendErrorResponse } from "../utils/sendResponse";
import { PrismaClient } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();
const Role = prisma.roles;
const User = prisma.users;

export default (permission: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. We have to check if this user, who is provided by `req.user`, has permissions to the `permission` argument provided from the `routes` folder
    // The `roles` works an intermediary between `users` and `permissions`
    // 2. We have to access to the permissions of the user via the `roles_permissions` model
    const user = await User.findUnique({
      where: {
        id: req.user?.id,
      },
      include: {
        roles: {
          select: {
            role: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const userRoleId = user?.roles[0].role.id;

    // What permissions does the user have?
    const userRolePermissions = await Role.findMany({
      where: {
        id: userRoleId,
      },
      include: {
        permissions: {
          select: {
            permission: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const userPermissions = userRolePermissions[0].permissions;

    const hasUserPermission = userPermissions.some(
      (user) => user.permission.name === permission
    );

    if (await hasUserPermission) {
      return next();
    }

    return sendErrorResponse(
      res,
      403,
      "You do not have the authorization to access this"
    );
  };

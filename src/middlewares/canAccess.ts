import { sendErrorResponse } from "../utils/sendResponse";
import { PrismaClient } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();
const Permission = prisma.permissions;
const Role = prisma.roles;
const User = prisma.users;

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
      },
    });

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

    console.log("hasUserPermission", hasUserPermission);

    async function hasPermission(permission: any) {
      if (!permission || permission === "undefined") {
        return false;
      }
      const permissions = await Permission.findMany();

      const result = !!permissions
        .map(({ name }: { name: any }) => name)
        .includes(permission.name);

      console.log("result", result);

      return result;
    }

    async function hasPermissionThroughRole(permission: any) {
      if (!permission || permission === "undefined") {
        return false;
      }
      const roles = await Role.findMany();
      for await (const item of permission.roles) {
        if (
          roles.filter((role) => {
            role.name === item.role.name;
          }).length > 0
        ) {
          return true;
        }
      }
      return false;
    }

    async function hasPermissionTo(permission: any) {
      if (!permission || permission === "undefined") {
        return false;
      }
      return (
        (await hasPermissionThroughRole(permission)) ||
        hasPermission(permission)
      );
    }

    if (await hasPermissionTo(access)) {
      return next();
    }

    return sendErrorResponse(
      res,
      403,
      "You do not have the authorization to access this"
    );
  };

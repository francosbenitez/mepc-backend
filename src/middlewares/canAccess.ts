import { sendErrorResponse } from "../utils/sendResponse";
import { PrismaClient } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();
const Permission = prisma.permissions;
const Role = prisma.roles;
// const User = prisma.users;

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

    // const user = await User.findUnique({
    //   where: {
    //     id: req.user?.id,
    //   },
    //   include: {
    //     roles: {
    // select: {
    //   role: {
    //     select: {
    //       id: true,
    //     },
    //   },
    // },
    //     },
    //   },
    // });

    // console.log("user", user);
    // console.log("user.roles", user?.roles);
    // console.log("user.roles[0].role.id", user?.roles[0].role.id);

    // Check if the roleId = 1 has the required permissions
    // const getPermissionsBasedOnRole = await Permission.findMany({
    //   where: {
    //     id: user?.roles[0].role.id,
    //   },
    // include: {
    //   permissions: {
    //     select: {
    //       permission: {
    //         select: {
    //           id: true,
    //         },
    //       },
    //     },
    //   },
    // },
    // });

    // const getPermissions = await Permission.findMany();

    // console.log("getPermissions", getPermissions);
    // console.log("getPermissionsBasedOnRole", getPermissionsBasedOnRole);
    // console.log("permission", permission);

    async function hasPermission(permission: any) {
      if (!permission || permission === "undefined") {
        return false;
      }
      const permissions = await Permission.findMany();

      const result = !!permissions
        .map(({ name }: { name: any }) => name)
        .includes(permission.name);

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

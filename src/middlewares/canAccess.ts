import { sendErrorResponse } from "../utils/sendResponse";
import { PrismaClient } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();
const Permission = prisma.permissions;
const Role = prisma.roles;

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

    console.log("access", access);

    async function hasPermission(permission: any) {
      if (!permission || permission === "undefined") {
        return false;
      }
      const permissions = await Permission.findMany();
      return !!permissions
        .map(({ name }: { name: any }) => name)
        .includes(permission.name);
    }

    async function hasPermissionThroughRole(permission: any) {
      if (!permission || permission === "undefined") {
        return false;
      }
      const roles = await Role.findMany();
      for await (const item of permission.roles) {
        if (roles.filter((role) => role.name === item.name).length > 0) {
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
    console.error("You do not have the authorization to access this.");
    return sendErrorResponse(
      res,
      403,
      "You do not have the authorization to access this"
    );
  };

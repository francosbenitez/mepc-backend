import { Prisma } from "@prisma/client";
import Constants from "../../src/utils/constants";

export const permissionData: Prisma.permissionsCreateInput[] = [
  {
    name: Constants.PERMISSION_PUBLISH_ARTICLES,
    description: "",
  },
  {
    name: Constants.PERMISSION_VIEW_ALL_USERS,
    description: "",
  },
];

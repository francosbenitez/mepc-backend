import { Prisma } from "@prisma/client";
import Constants from "../../src/utils/constants";

export const roleData: Prisma.rolesCreateInput[] = [
  {
    name: Constants.ROLE_ADMIN,
    description: "",
  },
  {
    name: Constants.ROLE_AUTHENTICATED,
    description: "",
  },
];

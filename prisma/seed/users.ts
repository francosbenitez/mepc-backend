import { Prisma } from "@prisma/client";

export const userData: Prisma.usersCreateInput[] = [
  {
    username: "admin",
    email: "admin@email.com",
    password: "password",
  },
];

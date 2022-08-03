import { Prisma } from "@prisma/client";

export const userData: Prisma.usersCreateInput[] = [
  {
    username: "francosbenitez",
    email: "francosbenitez@gmail.com",
    password: "",
    articles: {
      create: [
        {
          title: "Franco's Article",
          content: "<p>Hello world from Franco's Article</p>",
          published: true,
        },
      ],
    },
  },
];

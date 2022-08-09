import { Prisma } from "@prisma/client";

export const articleData: Prisma.articlesCreateInput[] = [
  {
    title: "Title 1",
    content: "Content 1",
    published: false,
    author: {
      connect: {
        id: 1,
      },
    },
  },
  {
    title: "Title 2",
    content: "Content 2",
    published: true,
    author: {
      connect: {
        id: 2,
      },
    },
  },
];

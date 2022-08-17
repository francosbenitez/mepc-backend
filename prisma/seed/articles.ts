import { Prisma } from "@prisma/client";

export const articleData: Prisma.articlesCreateInput[] = [
  {
    slug: "title-1",
    title: "Title 1",
    content: "Content 1",
    published: false,
    user: {
      connect: {
        id: 1,
      },
    },
  },
  {
    slug: "title-2",
    title: "Title 2",
    content: "Content 2",
    published: true,
    user: {
      connect: {
        id: 2,
      },
    },
  },
];

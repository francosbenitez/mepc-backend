import { Prisma } from "@prisma/client";

export const commentData: Prisma.commentsCreateInput[] = [
  {
    name: "",
    text: "¡Muy bueno!",
    user: {
      connect: {
        id: 1,
      },
    },
    article: {
      connect: {
        id: 1,
      },
    },
  },
  {
    name: "",
    text: "¡Interesante!",
    user: {
      connect: {
        id: 2,
      },
    },
    article: {
      connect: {
        id: 2,
      },
    },
  },
  {
    name: "",
    text: "¡Muy crack!",
    user: {
      connect: {
        id: 2,
      },
    },
    article: {
      connect: {
        id: 2,
      },
    },
  },
];

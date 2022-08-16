import { Prisma } from "@prisma/client";

export const commentData: Prisma.commentsCreateInput[] = [
  {
    name: "",
    text: "¡Muy bueno!",
    article: {
      connect: {
        id: 1,
      },
    },
  },
  {
    name: "",
    text: "¡Interesante!",
    article: {
      connect: {
        id: 2,
      },
    },
  },
  {
    name: "",
    text: "¡Muy crack!",
    article: {
      connect: {
        id: 2,
      },
    },
  },
];

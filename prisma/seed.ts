import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.usersCreateInput[] = [
  {
    username: "francosbenitez",
    email: "francosbenitez@gmail.com",
    password: "1234",
    articles: {
      create: [
        {
          title: "The Franco's Article",
          content: "<p>Hello world from the Franco's Article</p>",
          published: true,
        },
      ],
    },
  },
  {
    username: "tatiana.davico",
    email: "tatiana.davico@gmail.com",
    password: "1234",
    articles: {
      create: [
        {
          title: `The Tatiana's Article`,
          content: `<p>Hello world from the Tatiana's Article</p>`,
          published: true,
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.users.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

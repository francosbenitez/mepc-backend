import { PrismaClient } from "@prisma/client";
import { userData } from "./users";
import { roleData } from "./roles";
import { permissionData } from "./permissions";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  const seedData = async (
    dataType: any,
    dataModel: any,
    modelString: string
  ) => {
    console.log(`Seeding ${modelString} ...`);
    const model = dataModel;
    for (const u of dataType) {
      const data = await model.create({
        data: u,
      });
      console.log(`Created ${modelString.slice(0, -1)} with id: ${data.id}`);
    }
  };

  await seedData(userData, prisma.users, "users");
  await seedData(roleData, prisma.roles, "roles");
  await seedData(permissionData, prisma.permissions, "permissions");
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

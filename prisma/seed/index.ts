import { PrismaClient } from "@prisma/client";
import { roleData } from "./roles";
import { permissionData } from "./permissions";
import Constants from "../../src/utils/constants";
import bcrypt from "bcrypt";

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

  await seedData(roleData, prisma.roles, "roles");
  await seedData(permissionData, prisma.permissions, "permissions");

  const adminUser = await prisma.users.create({
    data: {
      username: "admin",
      email: "admin@email.com",
      password: bcrypt.hashSync("password", 10),
    },
  });

  const adminRole = await prisma.roles.findUnique({
    where: { name: Constants.ROLE_ADMIN },
  });

  const adminPermissions = await prisma.permissions.findMany({
    where: {
      name: {
        in: [
          Constants.PERMISSION_PUBLISH_ARTICLES,
          Constants.PERMISSION_VIEW_ALL_USERS,
        ],
      },
    },
  });

  await prisma.roles_users.create({
    data: {
      role: {
        connect: {
          id: adminRole?.id,
        },
      },
      user: {
        connect: {
          id: adminUser.id,
        },
      },
    },
  });

  for (const permission of adminPermissions) {
    await prisma.roles_permissions.create({
      data: {
        permission: {
          connect: {
            id: permission.id,
          },
        },
        role: {
          connect: {
            id: adminRole?.id,
          },
        },
      },
    });
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

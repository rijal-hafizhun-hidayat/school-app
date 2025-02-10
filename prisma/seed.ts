import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.role.createMany({
    data: [
      {
        name: "admin",
      },
    ],
  });

  const user = await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@gmail.com",
      password:
        "$scrypt$n=16384,r=8,p=1$u4fc/MAG7AFc4THG8TD4mA$jzgInuZ47yRZuJADlsT06XxSjufeiJBU8gTDQIF+5xKcvw35zpl5L6/IFMBWZksTE5mr9WzY7uuPBJfchBokvw", //password
    },
  });

  const roleName = await prisma.role.findUnique({
    where: {
      name: "admin",
    },
  });

  if (!roleName) {
    throw createError({ statusCode: 404, statusMessage: "role not found" });
  }

  const userRole = await prisma.user_role.create({
    data: {
      user_id: user.id,
      role_id: roleName.id,
    },
  });

  console.log(roles);
  console.log(user);
  console.log(userRole);
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

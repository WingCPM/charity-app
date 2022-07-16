const { PrismaClient } = require("@prisma/client");
const { charities, businesses, users } = require("./data.ts");
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.businesses.deleteMany();
    console.log("Deleted records in businesses table");

    await prisma.charities.deleteMany();
    console.log("Deleted records in charity table");

    await prisma.$queryRaw`ALTER TABLE Businesses AUTO_INCREMENT = 1`;
    console.log("reset businesses auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE Charities AUTO_INCREMENT = 1`;
    console.log("reset charity auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE Users AUTO_INCREMENT = 1`;
    console.log("reset users auto increment to 1");

    await prisma.charities.createMany({
      data: charities,
    });

    console.log("Added charity data");

    await prisma.businesses.createMany({
      data: businesses,
    });

    console.log("Added businesses data");

    await prisma.users.createMany({
      data: users,
    });

    console.log("Added users data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();

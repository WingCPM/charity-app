const { PrismaClient } = require("@prisma/client");
const { charities, businesses } = require("./data.ts");
const prisma = new PrismaClient();

const load = async () => {
  try {
    // await prisma.charity.deleteMany();
    // console.log("Deleted records in charity table");

    // await prisma.businesses.deleteMany();
    // console.log("Deleted records in businesses table");

    // await prisma.$queryRaw`ALTER TABLE Businesses AUTO_INCREMENT = 1`;
    // console.log("reset businesses auto increment to 1");

    // await prisma.$queryRaw`ALTER TABLE Charity AUTO_INCREMENT = 1`;
    // console.log("reset charity auto increment to 1");

    await prisma.charities.createMany({
      data: charities,
    });

    console.log("Added charity data");

    await prisma.businesses.createMany({
      data: businesses,
    });

    console.log("Added businesses data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();

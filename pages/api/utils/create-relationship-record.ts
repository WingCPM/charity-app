import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export const createRelationshipRecord = async () => {
  try {
    await client.businesses.create({
      data: {
        name: "By Miles",
        donation_amount: 2000,
        charity_id: 1,
      },
    });
    console.log("successfuly creted record");
  } catch (error) {
    console.log("error creating relationship record", error);
  }
};

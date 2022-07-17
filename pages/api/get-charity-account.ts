import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function handler(req, res) {
  try {
    const accountDetails = await client.charities.findUnique({
      where: {
        name: "RSPCA",
      },
    });
    console.log("successfuly creted record");
    res.send(accountDetails);
  } catch (error) {
    console.log("error creating relationship record", error);
  }
}

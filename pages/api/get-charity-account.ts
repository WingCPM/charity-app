import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { charity_name } = req.query;
    console.log("ssss", charity_name);

    const accountDetails = await client.charities.findUnique({
      where: {
        name: charity_name,
      },
      include: {
        causes: true,
      },
    });
    console.log("successfuly retrieved record");
    res.send(accountDetails);
  } catch (error) {
    console.log("error retrieving record", error);
    res.send(500);
  }
}

import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
const client = new PrismaClient();

export default async function handler(req: any, res: NextApiResponse) {
  const { business } = req.query;
  try {
    const partnerships = await client.businesses.findMany({
      where: {
        name: {
          equals: business,
        },
      },
      include: {
        charity: {
          include: {
            causes: true,
          },
        },
      },
    });
    console.log("successfuly got partnerships");
    res.send(partnerships);
  } catch (error) {
    console.log("error getting partnerships", error);
    res.send(500);
  }
}

import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { business_name, donation_amount } = req.body;
    console.log("wtf", business_name);
    console.log("wtf", donation_amount);
    await client.businesses.create({
      data: {
        name: business_name,
        donation_amount: donation_amount,
        charity_id: 4,
      },
    });
    console.log("successfuly creted record");
    res.send(200);
  } catch (error) {
    console.log("error creating relationship record", error);
  }
}

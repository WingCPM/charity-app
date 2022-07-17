import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { name, bio, website, tiktok, instagram, snapchat } = req.body;
    await client.charities.update({
      where: {
        name: "RSPCA",
      },
      data: {
        name,
        bio,
        website,
        tiktok,
        instagram,
        snapchat,
      },
    });
    console.log("successfuly creted record");
    res.send(200);
  } catch (error) {
    console.log("error creating relationship record", error);
  }
}

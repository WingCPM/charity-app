import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function handler(req, res) {
  const {
    name,
    bio,
    website,
    tiktok,
    instagram,
    snapchat,
    social,
    environmental,
    animals,
    education,
    science,
    conservation,
    training,
  } = req.body;
  try {
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
    console.log("SUCCESSFULLY UPDATED CHARITY TABLE");
  } catch (error) {
    console.log("ERROR UPDATING CHARITY TABLE", error);
    res.send(500);
  }

  try {
    await client.causes.update({
      where: {
        id: 1,
      },
      data: {
        social,
        environmental,
        animals,
        education,
        science,
        conservation,
        training,
      },
    });
    console.log("SUCCESSFULLY UPDATED CAUSES TABLE");
    res.send(200);
  } catch (error) {
    console.log("ERROR UPDATING CAUSES TABLE", error);
    res.send(500);
  }
}

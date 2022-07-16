import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export default async function handler(req, res) {
  try {
    try {
      const users = await client.users.findMany();
      res.send(users);
      console.log("successfuly got users", users);
      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "an error occurred" });
    }
  } catch (error) {
    console.log("error creating relationship record", error);
  }
}

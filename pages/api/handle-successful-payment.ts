import { postInstagram } from "./utils/instagram-post-image";
import { createRelationshipRecord } from "./utils/create-relationship-record";

// Needs to have context of the payment :(
export default async function handler(req, res) {
  try {
    await postInstagram();
  } catch (error) {
    return res.send({
      damn: "yeah",
    });
  }

  try {
    console.log("posted to insta - now save data in db");
    await createRelationshipRecord();
    res.redirect("/success");
  } catch (error) {
    res.send({
      shit: "true",
    });
  }
}

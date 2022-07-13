import { IgApiClient } from "instagram-private-api";
import thing from "../../../pages/api/assets/test.jpg";
const util = require("util");
const fs = require("fs");
const readdir = util.promisify(fs.readFile);
import { get } from "request-promise";

const { INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD } = process.env;

export const postInstagram = async () => {
  console.log({
    INSTAGRAM_USERNAME,
    INSTAGRAM_PASSWORD,
  });

  const ig = new IgApiClient();

  try {
    ig.state.generateDevice(INSTAGRAM_USERNAME);
    await ig.simulate.preLoginFlow();
    const auth = await ig.account.login(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD);

    console.log(JSON.stringify(auth));

    const imageBuffer = await get({
      url: "https://picsum.photos/800/800", // random picture with 800x800 size
      encoding: null, // this is required, only this way a Buffer is returned
    });

    console.log("imageBuffer", imageBuffer);

    const publishResult = await ig.publish
      .photo({
        file: imageBuffer,
        caption: "test",
      })
      .then(() => console.log("posted?????"))
      .catch((error) => console.log("errir posting", error));

    console.log("publishResult", publishResult);
    return publishResult;
  } catch (error) {
    console.log("error posting to instagram", error);
  }
};

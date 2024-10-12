import fsPromises from "node:fs/promises";
import { showInvalidInputError } from "../utils/customError.js";

const read = async (file) => {
  try {
    const text = await fsPromises.readFile(file, {
      encoding: "utf8",
    });
    console.log(text);
  } catch (err) {
    showInvalidInputError(err);
  }
};

export default read;

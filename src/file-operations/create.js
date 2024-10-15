import fsPromises from "node:fs/promises";
import { showInvalidInputError } from "../utils/customError.js";

const create = async (fileName) => {
  try {
    const fileContent = "";

    await fsPromises.writeFile(fileName, fileContent, {
      encoding: "utf-8",
      flag: "wx",
    });
  } catch (err) {
    showInvalidInputError(err);
  }
};

export default create;

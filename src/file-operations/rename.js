import fsPromises from "node:fs/promises";
import path from "node:path";
import { showExecutionError } from "../utils/customError.js";

const rename = async (oldPath, newFilename) => {
  try {
    const directory = path.dirname(oldPath);
    const newPath = path.join(directory, newFilename);
    await fsPromises.rename(oldPath, newPath);
  } catch (err) {
    showExecutionError(err);
  }
};

export default rename;

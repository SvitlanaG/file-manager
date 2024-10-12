import fsPromises from "node:fs/promises";
import { showExecutionError } from "../utils/customError.js";

const rename = async (oldPath, newPath) => {
  try {
    await fsPromises.rename(oldPath, newPath);
  } catch (err) {
    showExecutionError(err);
  }
};

export default rename;

import fsPromises from "node:fs/promises";
import { throwExecutionError } from "../utils/customError.js";

const goToFolder = async (targetDir) => {
  try {
    const stats = await fsPromises.stat(targetDir);

    if (stats.isDirectory()) {
      process.chdir(targetDir);
    } else {
      console.error(`${targetDir} is not a directory.`);
      throwExecutionError();
    }
  } catch (err) {
    console.error(`Failed to change directory: ${err.message}`);
    throwExecutionError();
  }
};

export default goToFolder;

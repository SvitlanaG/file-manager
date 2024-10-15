import fsPromises from "node:fs/promises";
import {
  showInvalidInputError,
  showExecutionError,
} from "../utils/customError.js";

const goToFolder = async (targetDir) => {
  try {
    const stats = await fsPromises.stat(targetDir);

    if (stats.isDirectory()) {
      process.chdir(targetDir);
    } else {
      showInvalidInputError(`${targetDir} is not a directory.`);
    }
  } catch (err) {
    showExecutionError(err);
  }
};

export default goToFolder;

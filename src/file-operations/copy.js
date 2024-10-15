import fs from "node:fs";
import path from "node:path";
import { showExecutionError } from "../utils/customError.js";

const copy = async (src, destDir) => {
  try {
    await fs.promises.mkdir(destDir, { recursive: true });
    const destPath = path.join(destDir, path.basename(src));

    const readStream = fs.createReadStream(src);
    const writeStream = fs.createWriteStream(destPath);

    readStream.pipe(writeStream);

    readStream.on("error", (err) => {
      showExecutionError(err);
    });

    writeStream.on("error", (err) => {
      showExecutionError(err);
    });
  } catch (err) {
    showExecutionError(err);
  }
};

export default copy;

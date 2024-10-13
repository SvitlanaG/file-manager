import zlib from "zlib";
import fs from "fs";
import path from "node:path";
import { showExecutionError } from "../utils/customError.js";

const decompress = async (file, destination) => {
  try {
    const brotli = zlib.createBrotliDecompress();
    const filePath = path.resolve(file);
    const destinationPath = path.resolve(destination);
    const input = fs.createReadStream(filePath);
    const originalFileName = path.basename(filePath, ".br");
    const outputPath = path.join(destinationPath, originalFileName);
    const output = fs.createWriteStream(outputPath);

    input.pipe(brotli).pipe(output);

    input.on("error", (err) => {
      showExecutionError(err);
    });

    output.on("error", (err) => {
      showExecutionError(err);
    });

    brotli.on("error", (err) => {
      showExecutionError(err);
    });
  } catch (err) {
    showExecutionError(err);
  }
};

export default decompress;

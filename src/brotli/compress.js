import zlib from "node:zlib";
import fs from "node:fs";
import path from "node:path";
import { showExecutionError } from "../utils/customError.js";

const compress = async (file, destination) => {
  try {
    const brotli = zlib.createBrotliCompress();
    const filePath = path.resolve(file);
    const destinationPath = path.resolve(destination);
    const input = fs.createReadStream(filePath);
    const archiveName = path.basename(filePath) + ".br";
    const outputPath = path.join(destinationPath, archiveName);
    const output = fs.createWriteStream(outputPath);

    input.pipe(brotli).pipe(output);

    input.on("error", showExecutionError);
    output.on("error", showExecutionError);
    brotli.on("error", showExecutionError);
  } catch (err) {
    showExecutionError(err);
  }
};

export default compress;

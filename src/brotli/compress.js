import zlib from "node:zlib";
import fs from "node:fs";
import { showExecutionError } from "../utils/customError.js";

const compress = async (file, destination) => {
  try {
    const brotli = zlib.createBrotliCompress();
    const input = fs.createReadStream(file);
    const output = fs.createWriteStream(destination);

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

export default compress;

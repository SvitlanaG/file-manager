import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { showExecutionError } from "../utils/customError.js";

export const calcHash = async (file) => {
  try {
    const hash = createHash("sha256");
    const stream = createReadStream(file);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => {
      const hexHash = hash.digest("hex");
      console.log(`hex: ${hexHash}`);
    });

    stream.on("error", (err) => {
      showExecutionError(err);
    });
  } catch (err) {
    showExecutionError(err);
  }
};

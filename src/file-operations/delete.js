import fsPromises from "node:fs/promises";
import { showExecutionError } from "../utils/customError.js";

const remove = async (file) => {
  try {
    await fsPromises.rm(file);
  } catch (err) {
    showExecutionError(err);
  }
};

export default remove;

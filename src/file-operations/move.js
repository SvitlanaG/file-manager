import copy from "./copy.js";
import remove from "./delete.js";
import { showExecutionError } from "../utils/customError.js";

const move = async (src, destDir) => {
  try {
    await copy(src, destDir);
    await remove(src);
  } catch (err) {
    showExecutionError(err);
  }
};

export default move;

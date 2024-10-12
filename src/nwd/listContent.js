import fsPromises from "node:fs/promises";
import path from "node:path";
import { throwExecutionError } from "../utils/customError.js";

const listContent = async () => {
  try {
    const currentDir = process.cwd();
    const dirContent = await fsPromises.readdir(currentDir);

    const detailedContents = await Promise.all(
      dirContent.map(async (item) => {
        const itemPath = path.join(currentDir, item);
        const stats = await fsPromises.stat(itemPath);
        return {
          name: item,
          type: stats.isDirectory() ? "directory" : "file",
        };
      })
    );

    const sortedContents = detailedContents.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === "directory" ? -1 : 1;
    });

    console.log("Index  | Name                                     | Type");
    console.log("------------------------------------------------------------");

    sortedContents.forEach((item, index) => {
      let padZeroIndex = index < 10 ? " " + index : index;
      console.log(
        `${padZeroIndex}     | ${item.name.padEnd(40)} | ${item.type}`
      );
    });
  } catch (err) {
    console.error(`Failed to list directory contents: ${err.message}`);
    throwExecutionError();
  }
};

export default listContent;

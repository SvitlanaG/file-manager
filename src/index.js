import { getUsername } from "./utils/getUsername.js";
import {
  read,
  create,
  rename,
  copy,
  remove,
  move,
} from "./file-operations/index.mjs";
import { goUpper, goToFolder, listContent } from "./nwd/index.mjs";
import { printCurrentDirectory, exitProgram } from "./utils/utils.js";
import { showInvalidInputError } from "./utils/customError.js";

const username = getUsername();
const homeDirectory = process.env.HOME || process.env.USERPROFILE;
process.chdir(homeDirectory);
console.log(`Welcome to the File Manager, ${username}`);
printCurrentDirectory();
process.stdin.setEncoding("utf8");

process.stdin.on("data", async (input) => {
  const trimmedInput = input.trim();
  if (trimmedInput === ".exit") {
    exitProgram(username);
  } else {
    const [command, target, extraArg] = trimmedInput.split(" ");
    switch (command) {
      case "up":
        goUpper();
        break;
      case "cd":
        if (target) {
          await goToFolder(target);
        } else {
          showInvalidInputError("Please provide a directory to navigate to.");
        }
        break;
      case "ls":
        await listContent();
        break;
      case "cp":
        await copy(target, extraArg);
        break;
      case "add":
        await create(target);
        break;
      case "rm":
        await remove(target);
        break;
      case "mv":
        await move(target, extraArg);
        break;
      case "cat":
        await read(target);
        break;
      case "rn":
        await rename(target, extraArg);
        break;
      default:
        showInvalidInputError(
          "Available commands: cd, up, ls, cat, add, rn, cp, rm, mv"
        );
        break;
    }
    printCurrentDirectory();
  }
});

process.on("SIGINT", () => {
  exitProgram(username);
});

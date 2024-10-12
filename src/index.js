import os from "node:os";
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
      case "os":
        if (target === "--EOL") {
          console.log(`End-Of-Line: ${JSON.stringify(os.EOL)}`);
        } else if (target === "--cpus") {
          const cpus = os.cpus();
          console.log(`Overall amount of CPUs: ${cpus.length}`);
          cpus.forEach((cpu, index) => {
            console.log(
              `CPU ${index + 1}: Model: ${cpu.model}, Clock Rate: ${(
                cpu.speed / 1000
              ).toFixed(2)} GHz`
            );
          });
        } else if (target === "--homedir") {
          const homeDir = os.homedir();
          console.log(`Home Directory: ${homeDir}`);
        } else if (target === "--username") {
          const userInfo = os.userInfo();
          console.log(`Current system user name: ${userInfo.username}`);
        } else if (target === "--architecture") {
          const architecture = os.arch();
          console.log(`CPU architecture: ${architecture}`);
        } else {
          showInvalidInputError(
            "Available options: --EOL, --cpus, --homedir, --username, --architecture"
          );
        }
        break;
      default:
        showInvalidInputError(
          "Available commands: cd, up, ls, cat, add, rn, cp, rm, mv, os"
        );
        break;
    }
    printCurrentDirectory();
  }
});

process.on("SIGINT", () => {
  exitProgram(username);
});

import { getUsername } from "./utils/getUsername.js";
// import { copy, create, delete as delete_, move, read, rename } from "./file-operations/index.mjs";
import { goUpper, goToFolder, listContent } from "./nwd/index.mjs";
import { printCurrentDirectory, exitProgram } from "./utils/utils.js";

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
          console.error("Please provide a directory to navigate to.");
        }
        break;
      case "ls":
        await listContent();
        break;
      case "copy":
        copy(target || ".");
        break;
      case "create":
        createFile(target, extraArg || "");
        break;
      case "delete":
        deleteFile(target);
        break;
      case "move":
        move(target);
        break;
      case "read":
        readFile(target);
        break;
      case "rename":
        renameFile(target, extraArg);
        break;
      default:
        console.error(
          "Invalid command. Available commands: cd, up, ls, copy, create, delete, move, read, rename"
        );
        break;
    }
    printCurrentDirectory();
  }
});

process.on("SIGINT", () => {
  exitProgram(username);
});

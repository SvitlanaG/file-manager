import { getUsername } from "./cli/username.js";

const username = getUsername();

console.log(`Welcome to the File Manager, ${username}`);

process.stdin.setEncoding("utf8");

process.stdin.on("data", (input) => {
  const trimmedInput = input.trim();
  if (trimmedInput === ".exit") {
    exitProgram();
  } else {
    console.log(
      `You entered: ${trimmedInput}, ${process.env.npm_config_username}`
    );
  }
});

process.on("SIGINT", () => {
  exitProgram();
});

function exitProgram() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}

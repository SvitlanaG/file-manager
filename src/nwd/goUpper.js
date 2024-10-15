import path from "path";

const goUpper = () => {
  const currentDir = process.cwd();
  const parentDir = path.dirname(currentDir);

  if (currentDir === parentDir) {
    console.log("You are already in the root directory. Cannot go up.");
  } else {
    process.chdir(parentDir);
  }
};

export default goUpper;

export const printCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

export const exitProgram = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
};

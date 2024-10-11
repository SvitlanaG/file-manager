import { userInfo } from "os";
import { throwInvalidInputError } from "../utils/customError.js";

export const getUsername = () => {
  try {
    const args = process.argv.slice(2);
    const osUserInfo = userInfo();
    const usernameArg = args.find((arg) => arg.startsWith("--username="));
    const username =
      usernameArg && usernameArg.split("=")[1]
        ? usernameArg.split("=")[1]
        : osUserInfo.username;

    return username;
  } catch (e) {
    console.error(e);
    throwInvalidInputError();
  }
};

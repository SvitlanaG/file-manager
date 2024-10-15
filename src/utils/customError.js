const createCustomError = (message) => {
  return console.error(message);
};

export const showInvalidInputError = (errorMessage) => {
  const errorTitle = "Invalid input! ";
  return createCustomError(errorTitle + errorMessage);
};

export const showExecutionError = (errorMessage) => {
  const errorTitle = "Operation failed! ";
  return createCustomError(errorTitle + errorMessage);
};

const createCustomError = (message) => {
  return new Error(message);
};

export const throwInvalidInputError = () => {
  const errorMessage = "Invalid input";
  throw createCustomError(errorMessage);
};

export const throwExecutionError = () => {
  const errorMessage = "Operation failed";
  throw createCustomError(errorMessage);
};

function Validate(condition, error_message) {
  if (condition) {
    throw new Error(error_message);
  }
}

export { Validate };

function getIsDefined<T>(variable: T): variable is NonNullable<T> {
  return variable !== null && variable !== undefined;
}

export default getIsDefined;

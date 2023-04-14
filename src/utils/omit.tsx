export const omit = (obj: any, keys: string[]) => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
};

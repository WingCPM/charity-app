export const createURLPathFromCharity = (name: string) =>
  name.split(" ").join("_").toLowerCase();

export const revertURLPathFromCharity = (path: string) =>
  path.split("_").join(" ").toLowerCase();

import { packagePath } from "../constants";

// Resolves a partial by name only: the `systems/<id>` vs `modules/<id>` root is
// decided at build time, so templates never have to know which kind of package
// they belong to.
export const partial = function (path: string) {
  return `${packagePath}/templates/partials/${path}`;
};

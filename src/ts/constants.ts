export const defaultLenght = {
  talent: 5,
};

export const difficultyLevels = [
  { value: 0, label: "easy" },
  { value: -10, label: "medium" },
  { value: -20, label: "hard" },
  { value: -30, label: "veryhard" },
  { value: -40, label: "impossible" },
];

export const moduleId: string = __PACKAGE_ID__;

// `systems/<id>` or `modules/<id>`: the root every template, style and asset
// path hangs off. Always build Foundry paths from this, never by hand.
export const packagePath: string = `${__PACKAGE_KIND__}s/${__PACKAGE_ID__}`;

// eslint-disable-next-line
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "p5js", "p5js/sound"],
  parserOptions: {
    ecmaVersion: 12,
  },
  globals: { mess: true },
  rules: {
    "no-var": "error",
    "prefer-const": "error",
  },
};

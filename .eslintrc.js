// eslint-disable-next-line
module.exports = {
  env: {
    browser: true,
    // es2021: true,
  },
  extends: ["eslint:recommended", "p5js", "p5js/sound"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  globals: {},
  rules: {
    "no-var": "error",
    "prefer-const": "error",
  },
};

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks", "prettier"],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "prettier/prettier": "warn"
  }
};

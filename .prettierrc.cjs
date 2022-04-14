module.exports = {
  singleQuote: true,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  // trailingComma: 'all',
  printWidth: 80,
  jsxBracketSameLine: false,
  arrowParens: "always",
  overrides: [
    {
      files: "styles.ts",
      options: {
        jsxBracketSameLine: true
      }
    }
  ]
};

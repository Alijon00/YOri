/* ESLint для TypeScript + React (strict), совместно с Prettier. */
module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-hooks', 'react-refresh', '@typescript-eslint'],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
  rules: {
    ...require('eslint-plugin-react-hooks').configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Запрет any — по требованиям проекта.
    '@typescript-eslint/no-explicit-any': 'error',
  },
};

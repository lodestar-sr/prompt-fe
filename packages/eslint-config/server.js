const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],
  plugins: ['only-warn', 'simple-import-sort'],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    'import/export': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-default-export': 'off',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/prefer-default-export': 'off',
    'import/order': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/',
  ],
  overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
};

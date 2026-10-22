import nextPlugin from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = [
  ...nextPlugin,
  prettierConfig,
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', '.engram/**'],
    rules: {
      'import/no-anonymous-default-export': 'off',
    },
  },
];

export default eslintConfig;

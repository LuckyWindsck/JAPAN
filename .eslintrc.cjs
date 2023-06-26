/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

const typescriptRules = {
  '@typescript-eslint/consistent-type-imports': 'error',
}

const sortingRules = {
  'import/order': [
    'error',
    {
      groups: [
        ['builtin', 'external'],
        'internal',
        ['parent', 'sibling', 'index'],
        'object',
        'type',
      ],
      alphabetize: { order: 'asc' },
      'newlines-between': 'always',
    },
  ],
  'sort-imports': [
    'error',
    {
      ignoreDeclarationSort: true, // Prevent conlict with rule 'import/order'
    },
  ],
}

const importRules = {
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: [
        '**/*.spec.ts',
        './vite.config.ts',
        './vitest.config.ts',
        './cypress.config.ts',
        './src/configs/vitest/setup.ts', // Refer to vitest.config.test.setupFiles
        './src/plugins/test-utils/**',
        './src/utils/test/**',
      ],
      optionalDependencies: false,
    },
  ],
  // Prefer named-export for better tree-shaking and enforcing style:
  // > default import / default export: vue components & css
  // > named-import / named-export: others
  'import/prefer-default-export': 'off',
}

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-airbnb-with-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  overrides: [
    {
      // Source: https://github.com/vuejs/eslint-config-airbnb/blob/main/packages/eslint-config-airbnb-with-typescript/index.js#L9-L10
      // > We manually apply all these rules to ['*.ts', '*.tsx', '*.vue'] only, because it doesn't
      //   make sense to apply all these rules to all files.
      //
      // Source: https://github.com/iamturns/eslint-config-airbnb-typescript#i-wish-this-config-would-support-
      // > For additional functionality, alter your ESLint config file.
      files: ['*.ts', '*.vue'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        // Source: https://typescript-eslint.io/architecture/parser/#project
        // > If you use project references, TypeScript will not automatically use project references
        //   to resolve files. This means that you will have to add each referenced tsconfig to the
        //   project field either separately, or via a glob.
        //
        // According to the instruction, we should list each referenced tsconfig. Otherwise, the
        // rules in 'plugin:@typescript-eslint/recommended-requiring-type-checking' cannot be
        // applied properly, because the parser of @typescript-eslint would not be able to resolve
        // some type.
        //
        // This will include the tsconfig.json for cypress, otherwise there will be no tsconfig that
        // include cypress-related ts files. Also, the tsconfig of cypress should be added here instead of
        // the override that only targets e2e test files, otherwises ts files in cypress/support
        // cannot be linted.
        //
        // Notice that we didn't use the glob './tsconfig.*.json'. It's because that
        // parserOptions.project seems to be order-mattered, and './tsconfig.app.json' should be
        // listed after './tsconfig.vitest.json'. However, './tsconfig.vitest.json' already extends
        // from './tsconfig.app.json', so there is no need for adding it here.
        project: ['./tsconfig.node.json', './tsconfig.vitest.json', './cypress/e2e/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      rules: {
        ...typescriptRules,
        ...sortingRules,
        ...importRules,
      },
    },
    {
      // Somehow we need to set parser of .vue file after extending recommended rules in
      // @typescript-eslint, otherwise parsing would fail. Also, somehow the
      // parserOptions.{parser,project,extraFileExtensions} has already been well set, so we don't
      // need to modify it.
      files: ['*.vue'],
      parser: require.resolve('vue-eslint-parser'),
    },
    {
      files: ['cypress/e2e/**/*.cy.ts'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  reportUnusedDisableDirectives: true,
}

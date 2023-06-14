/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-airbnb-with-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      // > We manually apply all these rules to ['*.ts', '*.tsx', '*.vue'] only, because it doesn't
      //   make sense to apply all these rules to all files.
      // Source: https://github.com/vuejs/eslint-config-airbnb/blob/main/packages/eslint-config-airbnb-with-typescript/index.js#L9-L10
      // > For additional functionality, alter your ESLint config file.
      // Source: https://github.com/iamturns/eslint-config-airbnb-typescript#i-wish-this-config-would-support-
      files: ['*.ts', '*.tsx', '*.vue'],
      'extends': [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
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
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}

module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-const': ['warn', { 'destructuring': 'any', 'ignoreReadBeforeAssign': false }],
    'indent': 'off',
    'vue/script-indent': ['warn', 2, { 'baseIndent': 1, 'switchCase': 1 }],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
  },
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ],
  parserOptions: {
    parser: 'babel-eslint'
  }
}

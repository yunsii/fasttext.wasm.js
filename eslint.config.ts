import janna from '@jannajs/lint/eslint'

export default janna({
  ignores: [
    'src/core/fastText.*.js',
    'core',
    'dist-docs',
  ],
  rules: {
    'node/prefer-global/buffer': 'off',
    'node/prefer-global/process': 'off',
  },
})

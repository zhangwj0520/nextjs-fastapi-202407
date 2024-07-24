import Omni from '@zhangwj0520/eslint-config'

export default Omni(
  {
    rules: {
      'no-console': 'off',
      'node/prefer-global/buffer': 'off',
      'act-refresh/only-export-components': 'off',
    },
    globals: {
      process: true,
    },
  },

)

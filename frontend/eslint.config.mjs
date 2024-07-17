import Omni from '@zhangwj0520/eslint-config'

export default Omni(
  {
    rules: {
      'no-console': 'warn',
      'node/prefer-global/buffer': 'off',
    },
    globals: {
      process: true,
    },
  },

)

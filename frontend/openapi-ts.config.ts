/** @type {import('@zhangwj0520/openapi-ts').UserConfig} */
export default {
  input: 'http://127.0.0.1:9110/openapi.json',
  output: {
    path: 'client',
    lint: 'eslint',
  },
  types: {
    enums: 'javascript',
  },
  schemas: {
    type: 'json',
  },
  services: {
    asClass: true,
  },
}

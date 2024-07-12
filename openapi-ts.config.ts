/** @type {import('@zhangwj0520/openapi-ts').UserConfig} */
export default {
  input: 'http://127.0.0.1:8910/openapi.json',
  output: {
    path: 'client',
    format: 'biome',
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

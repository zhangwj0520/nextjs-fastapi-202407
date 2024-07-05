/** @type {import('@hey-api/openapi-ts').UserConfig} */
export default {
  input: 'http://127.0.0.1:8910/openapi.json',
  output: {
      path:"app/client",
      format: 'biome' 
  },
  types: {
    enums: 'javascript',
  },
  // client:'@hey-api/client-fetch',//@hey-api/client-fetch
  schemas: {
    type: 'json'
  },
  services: {
    asClass: true,
  },
};
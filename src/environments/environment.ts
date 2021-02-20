// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: 'http://vmfvmf.com:8080',
  assetsPath: '../assets/',
  endpoints: {
    apiTrt15: 'http://localhost:8080/pontos-funcao-frontend-comum-api/api',
    integracaoRH: 'http://localhost:8080/integracaorh-comum-api/api',
  },
  security: {
    apiTrt15: 'http://localhost:8080/pontos-funcao-frontend-comum-api/api',
    clientId: '',
    clientSecret: '',
  }
};

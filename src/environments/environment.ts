// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  fireBaseConfig: {
    apiKey: 'AIzaSyAzxPdmIl3zyyhWR_4bYcP6JBzVQLUPLhE',
    authDomain: 'yogaseed-employee-dashboard.firebaseapp.com',
    databaseURL: 'https://yogaseed-employee-dashboard.firebaseio.com',
    projectId: 'yogaseed-employee-dashboard',
    storageBucket: 'yogaseed-employee-dashboard.appspot.com',
    messagingSenderId: '814696094580'
  }
};

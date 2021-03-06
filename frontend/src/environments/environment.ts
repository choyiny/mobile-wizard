// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  frontendUrl: 'http://localhost:4200',
  backend: 'http://localhost:5000',
  peerserver: {
    host: 'peer.projectmobilewizard.com',
    port: 443,
    secure: true
  },
  firebase: {
    apiKey: 'AIzaSyA26YNIsHkO16TniyYAVFxtZYZ6o96OV_s',
    authDomain: 'project-mobile-wizard.firebaseapp.com',
    databaseURL: 'https://project-mobile-wizard.firebaseio.com',
    projectId: 'project-mobile-wizard',
    storageBucket: 'project-mobile-wizard.appspot.com',
    messagingSenderId: '982482942774'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

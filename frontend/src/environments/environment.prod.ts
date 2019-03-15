export const environment = {
  production: true,
  backend: 'http://localhost:8000/',
  peerserver: {
    id: 'asdf', // blank string for random room id
    host: 'peer.choy.in',
    port: 443,
    key: 'peerjs',
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

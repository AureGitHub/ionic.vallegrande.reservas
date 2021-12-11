// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAGLlGWZGxs8ghEctjHZxYAorheRt0VZe8",
    authDomain: "ionicfaryland.firebaseapp.com",
    projectId: "ionicfaryland",
    storageBucket: "ionicfaryland.appspot.com",
    messagingSenderId: "380467474733",
    appId: "1:380467474733:web:cc48734b6d5953c09d23a4",
    measurementId: "${config.measurementId}"
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

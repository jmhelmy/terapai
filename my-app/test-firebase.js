// my-app/test-firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-creds.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Firestore works?", !!admin.firestore());

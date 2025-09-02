// src/firebase.ts
import admin from 'firebase-admin';

const serviceAccount = require("./serviceAccountKey.json")
console.log("serviceAccount : ",serviceAccount);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;

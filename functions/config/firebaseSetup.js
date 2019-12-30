
const admin = require('firebase-admin')
const firebase = require('firebase')
const serviceAccount = require('../leggo_service_account.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "leggo-38877.appspot.com"
})

// const db = admin.firestore()

const config = {
    apiKey: "AIzaSyAM37fS_Hy9ctfa14r2seiC_E8Pzxt9BNI",
    authDomain: "leggo-38877.firebaseapp.com",
    databaseURL: "https://leggo-38877.firebaseio.com",
    projectId: "leggo-38877",
    storageBucket: "leggo-38877.appspot.com",
    messagingSenderId: "372555364946",
    appId: "1:372555364946:web:6003620dc83e5104777d8b",
    measurementId: "G-XRY4QXECXS"
  };

firebase.initializeApp(config)

// module.exports = {db, admin, firebase, functions}


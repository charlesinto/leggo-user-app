console.disableYellowBox = true
import * as firebase from "firebase";
// import admin from "firebase-admin";
// import serviceAccount from "../keys/serviceAccount.json";
import "firebase/firestore";
import { apiKey, authDomain, databaseURL, projectId, storageBucket,
messagingSenderId, measurementId, appId } from "../config";

const config = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
}

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// })


if(!firebase.apps.length){
    firebase.initializeApp(config)
}


const db = firebase.firestore()

export {
   db,
   firebase
}

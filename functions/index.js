const functions = require('firebase-functions');
const express = require('express')
const bodyParser = require('body-parser');
require('./config/firebaseSetup')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.use()

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

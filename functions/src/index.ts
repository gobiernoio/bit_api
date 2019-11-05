import * as functions from 'firebase-functions';
import express = require('express');
 
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript


const app:express.Application = express();
// app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.send('hola mundo');
})

app.listen(8080, ()=>{
    console.log("Me estoy ejecutando desdde app");
})


//
exports.app = functions.https.onRequest(app);
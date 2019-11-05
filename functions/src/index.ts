// import './config.js';
import * as functions from 'firebase-functions';
import * as firebase from "firebase-admin";
import express = require('express');
import bodyParser = require('body-parser');
 
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript


const app:express.Application = express();

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
)
// app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('hola mundo sin refrescar');
})

app.post('/POST/Cliente/', function(req, res){
    let cliente = req.body;
    const ref = firebaseApp.database().ref('/clientes').push(req.body)

    ref.then(respuesta=>{
        console.log(cliente)
        res.json({
            mensaje: "Todo correcto en el cliente " + cliente, 
            resp: respuesta
        });
    })

    // res.json({"HOLA MUNDO":"Hola mundo"})
})

app.listen(8080, ()=>{
    console.log("Me estoy ejecutando desdde app");
})


//
exports.app = functions.https.onRequest(app);
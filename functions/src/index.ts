import * as functions from 'firebase-functions';
import * as firebase from "firebase-admin";
import express = require('express');
import bodyParser = require('body-parser');

const app: express.Application = express();

// ========================================================================
//  Configuración de conexión a la realtime database de firebase
// ========================================================================
const firebaseConfig = {
	apiKey: "AIzaSyD86LUPQUNA35KzcdRHMQ8BJ0qHy9-mZGk",
	authDomain: "betoapi.firebaseapp.com",
	databaseURL: "https://betoapi.firebaseio.com",
	projectId: "betoapi",
	storageBucket: "betoapi.appspot.com",
	messagingSenderId: "500838622877",
	appId: "1:500838622877:web:263910a12e226d3dd21674",
	measurementId: "G-Z3N5H3JF18"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



// ========================================================================
//  Get para la página de inicio
// ========================================================================
app.get('/', function (req, res) {
	res.send('Servidor funcionando...');
})



// ========================================================================
//  POST, recibe objeto JSON y almacena en firebase
// ========================================================================
app.post('/POST/NutriNET/Cliente/', function (req, res) {
    const id = firebase.database().ref().push().key;
    req.body.id = id;
    const ref = firebaseApp.database().ref(`/clientes/${id}`).set(req.body)
    

	if (req.body) {
		ref.then(respuesta => {
			res.status(200).json({
				ok: true,
				mensaje: "Se almacenó el objeto correctamente.",

			})

			res.json({
				referencia: respuesta
			});
		})
	} else {
		res.status(400).json({
			ok: false,
			mensaje: "No se está recibiendo ningún dato."
		})
	}
})



// ========================================================================
//  GET, recibe una key y retorna un json con el objeto dentro de dicha Key
// ========================================================================
app.get('/GET/NutriNET/Cliente/:id', function (req: any, res) {
	const id = req.params.id;
	console.log("EL id es " + id)
	const ref = firebaseApp.database().ref(`/clientes/${id}`)

	if (id) {
		ref.on('value', snapshot => {
			res.status(200).json(snapshot)

			res.json({
				snapshot
			});
		})
	} else {
		res.status(400).json({
			ok: false,
			mensaje: "No se está recibiendo ningún dato."
		})
	}
})



// ========================================================================
//  PUT, actualiza el objeto recibido, el objeto contiene en el cuerpo la key que se actualiza
// ========================================================================
app.put('/POST/NutriNET/Cliente/', function (req, res) {
    
	const ref = firebaseApp.database().ref(`/clientes/${req.body.id}`).set(req.body)

	if (req.body) {
		ref.then(respuesta => {
			res.status(200).json({
				ok: true,
				mensaje: "Se actualizó el objeto correctamente.",

			})

			res.json({
				referencia: respuesta
			});
		})
	} else {
		res.status(400).json({
			ok: false,
			mensaje: "No se está recibiendo ningún dato."
		})
	}
})



// ========================================================================
//  La ejecución es exportando app a functions para servirse en firebase hosting
// ========================================================================
exports.app = functions.https.onRequest(app);
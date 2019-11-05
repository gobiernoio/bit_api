import * as functions from 'firebase-functions';
import * as firebase from "firebase-admin";
import express = require('express');
import bodyParser = require('body-parser');

const app: express.Application = express();


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
// app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('hola mundo sin refrescar');
})

app.post('/POST/NutriNET/Cliente/', function (req, res) {
	const ref = firebaseApp.database().ref('/clientes').push(req.body)

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

// app.listen(8080, ()=>{
//     console.log("Me estoy ejecutando desdde app");
// })


//
exports.app = functions.https.onRequest(app);
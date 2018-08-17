'use strict';
const {
  dialogflow,
  BasicCard,
  BrowseCarousel,
  BrowseCarouselItem,
  Button,
  Carousel,
  Image,
  LinkOutSuggestion,
  List,
  MediaObject,
  Suggestions,
  SimpleResponse,
  Table,
 } = require('actions-on-google');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require('./');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
/*====================================================== CODE FOR DEBUGGING FIRESTORE
	 db.collection("").doc("").get()
	 .then( doc =>{
	 	if (!doc.exists) {
			console.log("no");
		}else{
			console.log(doc.get("..."));
		}
	})
	 .catch(err => {
	 	console.log("error... ", err);
	 	process.exit();
	 })
*///=====================================================

const app = dialogflow({debug: true});

app.intent('NombreDeIntent', (conv) => {
	conv.ask(new SimpleResponse({
		speech:"Checando Webhook",
        text:"Checando Webhook 😬",
    }));
	conv.ask(new Suggestions(['Hola', 'Dame precio', 'precio de bicicleta mixta']));
});



exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

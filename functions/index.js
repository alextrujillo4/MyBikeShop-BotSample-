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

var serviceAccount = require('./firestoreKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

const app = dialogflow({debug: true});

app.intent('NombreDeIntent', (conv) => {
	conv.ask(new SimpleResponse({
		speech:"Checando Webhook",
        text:"Checando Webhook 😬",
    }));
	conv.ask(new Suggestions(['Hola', 'Dame precio', 'precio de bicicleta mixta']));
});



exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

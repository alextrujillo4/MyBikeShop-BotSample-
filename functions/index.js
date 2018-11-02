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

app.intent('Precios[Incompleta]', (conv) => {
	conv.ask(new SimpleResponse({
		speech:"¿Sobre qué bicicleta te gustaría saber el precio?",
        text:"¿Sobre qué bicicleta te gustaría saber el precio?",
    }));
	conv.ask(new Suggestions(['Bicicleta de montaña', 'Bicicleta urbana', 'Bicicleta mixta']));
});


//Firestore integación
/*
app.intent('Precios[Incompleta] - correcta', (conv) => {
    var modelo = conv.parameters["Bicicletas"];
    var referencia = db.collection("Bicicletas").doc(modelo);
        return referencia.get().then( snap => {
            if (snap.exists) {
                const allData = snap.data();
                const precio = allData.precio;

                conv.ask(new SimpleResponse({
            		speech:"El precio de " + modelo + " es de :" + precio,
                    text:"El precio de " + modelo + " es de : " + precio + " 😬",
                }));
                 return console.log("Done!");
             }else{
                 conv.ask(new SimpleResponse({
                     speech:"Lo siento, este modelo no existe",
                     text:"Lo siento, este modelo no existe",
                 }));
             return console.log("Done!");
         }
     })
});

app.intent('Precios[Completa]', (conv) => {
    var modelo = conv.parameters["Bicicletas"];
    var referencia = db.collection("Bicicletas").doc(modelo);
        return referencia.get().then( snap => {
            if (snap.exists) {
                const allData = snap.data();
                const precio = allData.precio;

                conv.ask(new SimpleResponse({
            		speech:"El precio de " + modelo + " es de :" + precio,
                    text:"El precio de " + modelo + " es de : " + precio + " 😬",
                }));
                 return console.log("Done!");
             }else{
                 conv.ask(new SimpleResponse({
                     speech:"Lo siento, este modelo no existe",
                     text:"Lo siento, este modelo no existe",
                 }));
             return console.log("Done!");
         }
     })
});
*/

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

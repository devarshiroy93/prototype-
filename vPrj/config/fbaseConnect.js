// Initialize Firebase
var config = {
    apiKey: "AIzaSyDYCShuj_22kHA18Bi6mwD7967A8zBGlCs",
    authDomain: "prototype-bk.firebaseapp.com",
    databaseURL: "https://prototype-bk.firebaseio.com",
    projectId: "prototype-bk",
    storageBucket: "prototype-bk.appspot.com",
    messagingSenderId: "946117321289"
};

firebase.initializeApp(config);
var db = firebase.firestore();


//var citiesRef = db.collection("cities");

db.collection('conversations').doc('converstaionId')
                .collection('messages').doc('message1').set({
                    messageContent: 'hi',
                    attachment : 'none',
                    from : 'sender'
                });
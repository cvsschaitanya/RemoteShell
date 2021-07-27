const firebase = require("firebase");
require("firebase/firestore");

var firebaseConfig = {
	apiKey: "AIzaSyBKyVq3YsC936iDFzcDWqj-aZKoSRc7iCs",
	authDomain: "remoteshell-31947.firebaseapp.com",
	projectId: "remoteshell-31947",
	storageBucket: "remoteshell-31947.appspot.com",
	messagingSenderId: "947999164337",
	appId: "1:947999164337:web:b90c91ae980aabdd285f90",
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;

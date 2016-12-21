import firebase from 'firebase';

try {
    var config = {
        apiKey: "AIzaSyB3FwlSvydba2MwciEPRcGMKOaxRLcvVzQ",
        authDomain: "todoapp-291c0.firebaseapp.com",
        databaseURL: "https://todoapp-291c0.firebaseio.com",
        storageBucket: "todoapp-291c0.appspot.com",
        messagingSenderId: "388344158794"
    };
    firebase.initializeApp(config);
}
catch (e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;
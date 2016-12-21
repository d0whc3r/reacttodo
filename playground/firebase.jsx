import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyB3FwlSvydba2MwciEPRcGMKOaxRLcvVzQ",
    authDomain: "todoapp-291c0.firebaseapp.com",
    databaseURL: "https://todoapp-291c0.firebaseio.com",
    storageBucket: "todoapp-291c0.appspot.com",
    messagingSenderId: "388344158794"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

firebaseRef.set({
    app: {
        name: 'todo app',
        version: 0.1
    },
    isRunning: true,
    user: {
        name: 'first name',
        age: 22
    }
});

var notesRef = firebaseRef.child('notes');

notesRef.on('child_added', (snapshot) => {
    console.log('child_added:', snapshot.key, snapshot.val());
});
notesRef.on('child_changed', (snapshot) => {
    console.log('child_changed:', snapshot.key, snapshot.val());
});
notesRef.on('child_removed', (snapshot) => {
    console.log('child_removed:', snapshot.key, snapshot.val());
});

var newNoteRef = notesRef.push({
    id: 'some id',
    text: 'walkasdf'
});
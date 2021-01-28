import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDViYibmJ_q2C28TGVUx0YOyxwoX5KK910",
    authDomain: "snapchat-clone-daf00.firebaseapp.com",
    projectId: "snapchat-clone-daf00",
    storageBucket: "snapchat-clone-daf00.appspot.com",
    messagingSenderId: "1079801402340",
    appId: "1:1079801402340:web:1bd9d23ffde0d123a26df1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();


export {db, auth, storage, provider};
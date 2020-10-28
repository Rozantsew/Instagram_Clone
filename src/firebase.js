import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDODs93N8HsWqE3yud8erSpAdQFFaYpWZY",
  authDomain: "instagram-clone-bymike.firebaseapp.com",
  databaseURL: "https://instagram-clone-bymike.firebaseio.com",
  projectId: "instagram-clone-bymike",
  storageBucket: "instagram-clone-bymike.appspot.com",
  messagingSenderId: "473221899684",
  appId: "1:473221899684:web:2c0adcda8dad0b7f284d31",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

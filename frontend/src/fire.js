import firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyDZkoQ8wRK8iu9EAu7upcK2zynH6fM3p-I",
  authDomain: "cop4331-318204.firebaseapp.com",
  projectId: "cop4331-318204",
  storageBucket: "cop4331-318204.appspot.com",
  messagingSenderId: "459748357818",
  appId: "1:459748357818:web:2b8fe03834819e29e57483",
  measurementId: "G-H746LCW1H7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
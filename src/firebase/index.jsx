import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage };

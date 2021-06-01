import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC2pNojBLk9PJLnpD3s0CzGREEyDmvXUaI',
  authDomain: 'kvetinovy-swap.firebaseapp.com',
  projectId: 'kvetinovy-swap',
  storageBucket: 'kvetinovy-swap.appspot.com',
  messagingSenderId: '167423820753',
  appId: '1:167423820753:web:38af6c5df9d55320e556f0',
  measurementId: 'G-M77RRT3QQB',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
// if (location.hostname === 'localhost') {
//   db.useEmulator('localhost', 6001);
//   storage.useEmulator('localhost', 9199);
//   auth.useEmulator('http://localhost:9099');
// }
export { db, storage, auth };

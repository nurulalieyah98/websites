// This import loads the firebase namespace.
import firebase from 'firebase/app';
import 'firebase/firestore';

// These imports load individual services into the firebase namespace.
// import 'firebase/auth';
// import 'firebase/database';

const settings = {timestampsInSnapshtos: true}

var firebaseConfig = 
{
  apiKey: "AIzaSyAJEIDNaEXNuj17cAOg6pK78Fk_gARp5Wc",
  authDomain: "jasin-smart.firebaseapp.com",
  databaseURL: "https://jasin-smart.firebaseio.com",
  projectId: "jasin-smart",
  storageBucket: "jasin-smart.appspot.com",
  messagingSenderId: "356895521158",
  appId: "1:356895521158:web:23155ad05d934dcf999407"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings(settings);

export default firebase;
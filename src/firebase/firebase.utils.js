import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCKZtqVJvwljTWLcE22dsDotSWOmEmYuiw",
  authDomain: "crwn-db-d6ae6.firebaseapp.com",
  databaseURL: "https://crwn-db-d6ae6.firebaseio.com",
  projectId: "crwn-db-d6ae6",
  storageBucket: "crwn-db-d6ae6.appspot.com",
  messagingSenderId: "595186467485",
  appId: "1:595186467485:web:accbe9d95544f4ad384a74",
  measurementId: "G-P5KZ8D920R"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

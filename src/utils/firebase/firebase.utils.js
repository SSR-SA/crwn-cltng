import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// setdoc => Setting the document's data
// getdoc => Getting the document's data
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyeyrU0Zjby2a-ieLE1Jh-i2mTLVShDj0",
  authDomain: "crwn-cltng-db-44529.firebaseapp.com",
  projectId: "crwn-cltng-db-44529",
  storageBucket: "crwn-cltng-db-44529.appspot.com",
  messagingSenderId: "633811211388",
  appId: "1:633811211388:web:07aa52f5d458cc558ce5f9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

// Creating a user info from his/her authentication process
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  //   userSnapshot = User Data
  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // If the user data does not exist
  // Create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log(`There was an error creating the user: ${error.message}`);
    }

    // If user data exists
    // Return user data
    return userDocRef;
  }
};

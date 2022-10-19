import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

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

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// setdoc => Setting the document's data
// getdoc => Getting the document's data
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAo1GWjAc-dBNfAYo4mXPlR3mY_BiWiupc',
  authDomain: 'crwn-cltng-v1-d5c2a.firebaseapp.com',
  projectId: 'crwn-cltng-v1-d5c2a',
  storageBucket: 'crwn-cltng-v1-d5c2a.appspot.com',
  messagingSenderId: '572696598560',
  appId: '1:572696598560:web:73d19bce14e4671d904445',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Could be for facebookAuth, gitAuth....
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// Pushing our locak data to firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // collectionRef = This is the collection key we will have in the firesotre datebase. EX - categoreis, users, etc...
  const collectionRef = collection(db, collectionKey);
  // writeBatch method is used to push all the local data to the db in one successful transaction
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    //  docRef is the document reference for a collection in lowercase alphabets in firestore
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // Once the document is selected from local storage, we set the data to firestore
    batch.set(docRef, object);
  });

  // await until the data is stored in firestore
  await batch.commit();
  console.log('DONE');
};

// Retrieve categories from firebase
export const getCategoriesAndDocuments = async () => {
  // collectionRef = This is the collection key we will have in the firesotre datebase. EX - categoreis, users, etc...
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, []);

  return categoryMap;
};

// Creating a user info from his/her authentication process
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  // console.log(userDocRef);

  //   userSnapshot = User Data
  const userSnapshot = await getDoc(userDocRef);

  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  // If the user data does not exist
  // Create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(`There was an error creating the user: ${error.message}`);
    }

    // If user data exists
    // Return user data
    return userDocRef;
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) =>
  onAuthStateChanged(auth, callback);

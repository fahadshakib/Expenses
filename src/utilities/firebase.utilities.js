import { initializeApp } from "firebase/app";
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {getAuth, createUserWithEmailAndPassword,
        signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';

import handleError from './errors.utilities';
import compressImage from "./compress-image.utilities";



const firebaseConfig = {
  apiKey: "AIzaSyBRX3Bu_BigYEQKfgLjGeBrJ9aylxRebaA",
  authDomain: "expense-tracker-a2fa8.firebaseapp.com",
  projectId: "expense-tracker-a2fa8",
  storageBucket: "expense-tracker-a2fa8.appspot.com",
  messagingSenderId: "202383076536",
  appId: "1:202383076536:web:4e9eed978367362529984d"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const COLLECTION_USER = 'users';
export const COLLECTION_TRANSACTION = 'transactions';





export const uploadUserPhoto = async (photo, name) => {

  if (!photo) return null;
      
  try {
      
      const storageReference = ref(storage , 'photos/' + name + photo.name);
      const compressedPhoto = await compressImage(photo);
      await uploadBytes(storageReference , compressedPhoto);
      const url = await getDownloadURL(storageReference);
      return url;

  } catch (error) {

       error.code = 'photo/error'
       handleError(error);
  }

};

 export const createUserFromEmailAndPassword = async (userData) => {

  if(!userData.name || !userData.email || !userData.password) return;

  try {

      const {name , email , password ,  photo} = userData;
      const url = await uploadUserPhoto(photo , name);
      const {user} = await createUserWithEmailAndPassword(auth,email,password);
      const uid = user.uid;
      const reference = doc(db , COLLECTION_USER , uid);
      const snapShot = await getDoc(reference);
      const userFound = snapShot.exists();
  
      if(!userFound) {

        const data = {
          name,
          email,
          photo : url,
          joinedOn: new Date().toString()
        }
        await setDoc(reference , data);
      }

  } catch (error) {handleError(error)}
}



export const signInUserWithEmailAndPassword = async (email , password) => {

  if(!email || !password) return;

  try {

      await signInWithEmailAndPassword(auth , email , password);

  } catch (error) {handleError(error)}

}

export const signOutUser = async () => {

  try{
    await signOut(auth); } 
  
  catch(error){handleError(error)}

}


export const getUserDataFromFireStore = async (user) => {

    try {

      const reference = doc(db, COLLECTION_USER, user.uid);
      const snapshot = await getDoc(reference);

      if(snapshot.exists()) return snapshot.data();
      else return {};

    } catch (error){handleError(error)}
}


export const authStateChangedListener = (fn) => onAuthStateChanged(auth, fn);










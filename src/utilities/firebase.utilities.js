import {v4 as uuid} from 'uuid';
import { initializeApp } from "firebase/app";
import {getFirestore,doc,getDoc,setDoc,collection, deleteDoc, updateDoc} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import {getAuth, createUserWithEmailAndPassword,
        signInWithEmailAndPassword, signOut, onAuthStateChanged, EmailAuthProvider, reauthenticateWithCredential, updatePassword} from 'firebase/auth';

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
      
      let ext = photo.name.split('.');
      ext = ext[ext.length -1];
      name = name.split(' ').join('-') + '.' + ext;
      const storageReference = ref(storage , 'photos/' + name );
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


export const updateUserName = async (uid , newName) => {

      if(!uid || !newName) return;

      try {

        const reference = doc(db, COLLECTION_USER, uid);
        const snapshot = await getDoc(reference);
  
        if(snapshot.exists()) {
  
           await updateDoc(reference , {name : newName});
        }
      } catch(error){handleError(error)};

}

export const updateUserPassword= async (currentPassword , newPassword) => {

  if(!currentPassword || !newPassword) return;

  try {

    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email , currentPassword);
    await reauthenticateWithCredential(user , credential);
    await updatePassword(user , newPassword);

    }catch(error){handleError(error)};
}

export const updateUserPhoto = async (uid , name , photo) => {

      if(!uid || !name || !photo) return;

      try {

        const reference = doc(db, COLLECTION_USER, uid);
        const snapshot = await getDoc(reference);
        if(snapshot.exists()){

          const currentPhoto = snapshot.data.photo;
          if(currentPhoto){

            const reference = ref(storage , currentPhoto);
            await deleteObject(reference);
          }

          const url = await uploadUserPhoto(photo , name);
          await updateDoc(reference , {photo : url});
        }

      } catch (error) {handleError(error)};
}

export const authStateChangedListener = (fn) => onAuthStateChanged(auth, fn);




export const createTransaction = async (uid, transactionData) => {

  if (!uid || !transactionData) return;

  try {

    const transactionCollectionRef = collection(db, COLLECTION_TRANSACTION);
    const id = uuid();
    await setDoc(doc(transactionCollectionRef, id), { uid, ...transactionData });

  } catch (error) {

    handleError(error);

  }
};




export const deleteTransactionFromFirestore = async (transactionId) => {

    try {

        await deleteDoc(doc(db, COLLECTION_TRANSACTION, transactionId));

    } catch (error) {

        handleError(error);
    }
};
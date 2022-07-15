import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "polyaksnkrs-cde77",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

const db = getFirestore();
const sneakersCol = collection(db, "Sneakers");

const storage = getStorage();

export const getProducts = () => {
  return getDocs(sneakersCol).then((response) =>
    response.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  );
};

export const addProduct = (product) => {
  addDoc(sneakersCol, product);
};

export const deleteProduct = (id) => {
  const docRef = doc(db, "Sneakers", id);
  deleteDoc(docRef);
};

export const addProductPhoto = (formState, imageUpload, uploadImageNumber) => {
  const imagePath = `Sneakers/${formState.brand}/${formState.model}/${imageUpload[uploadImageNumber].name}`;
  const imageRef = ref(storage, imagePath);
  const url = "nothing"
  return uploadBytes(imageRef, imageUpload).then((response) => getDownloadURL(response.ref))
  // uploadBytes(imageRef, imageUpload);
  // return getDownloadURL(imageRef);
}; 


export const deleteProductPhoto = (formState, imageUpload) => {
  const imagePath = `Sneakers/${formState.brand}/${formState.model}/${
    imageUpload.name
  }`;
  const imageRef = ref(storage, imagePath);
  deleteObject(imageRef);
  alert("test");
};

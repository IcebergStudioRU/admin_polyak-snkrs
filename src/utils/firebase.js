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
  apiKey: "AIzaSyCc8o-gkQ6D3Qp4Ek9t7i4nsIeNTd2GujY",
  authDomain: "polyaksnkrs-cde77.firebaseapp.com",
  projectId: "polyaksnkrs-cde77",
  storageBucket: "polyaksnkrs-cde77.appspot.com",
  messagingSenderId: "104914846661",
  appId: "1:104914846661:web:af3cdee474b25e5c85c1ac",
  measurementId: "G-0EBW3LX808",
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

// Import the functions you need from the SDKs you need

import { getStorage } from 'firebase/storage';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore/lite';
// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyChjO3SfJVEfcCX64GTBWMMi1oCS739Qg4",

  authDomain: "try-bs.firebaseapp.com",

  projectId: "try-bs",

  storageBucket: "try-bs.appspot.com",

  messagingSenderId: "181307636992",

  appId: "1:181307636992:web:0faf05fe71109d1c2b07e5"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

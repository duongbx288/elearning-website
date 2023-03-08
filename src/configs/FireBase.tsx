// Import the functions you need from the SDKs you need

import { getStorage } from 'firebase/storage';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore/lite';
// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyC4p2VjmWVsahUGOxA6dft4Yta--i1MJ0I",

  authDomain: "web-elear.firebaseapp.com",

  projectId: "web-elear",

  storageBucket: "web-elear.appspot.com",

  messagingSenderId: "391298203027",

  appId: "1:391298203027:web:9dce54088f9057ee463c66"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

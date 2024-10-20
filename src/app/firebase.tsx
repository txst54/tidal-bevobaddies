// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDDcgb4FcsdQ7PZqVSgJWDC__Khp4cRm3c",
    authDomain: "tidal-bevobaddies.firebaseapp.com",
    databaseURL: "https://tidal-bevobaddies-default-rtdb.firebaseio.com",
    projectId: "tidal-bevobaddies",
    storageBucket: "tidal-bevobaddies.appspot.com",
    messagingSenderId: "384780744298",
    appId: "1:384780744298:web:ba7a3ea4da1e4921283c13",
    measurementId: "G-P7HWX0TBKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
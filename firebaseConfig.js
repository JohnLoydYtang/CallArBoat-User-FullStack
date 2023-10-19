import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {...} from "firebase/database";
import { getFirestore } from 'firebase/firestore';
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAUWz7jfrt46iBvAnZ-AESn8kNmqtbTlmw",
    authDomain: "callarboat-19b3b.firebaseapp.com",
    projectId: "callarboat-19b3b",
    storageBucket: "callarboat-19b3b.appspot.com",
    messagingSenderId: "68894973461",
    appId: "1:68894973461:web:008be388c45659cb7d781c",
    measurementId: "G-F86YXR2HNM"
  };

  const app = initializeApp(firebaseConfig);
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  const db = getFirestore(app);

  export { app, db, auth };

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

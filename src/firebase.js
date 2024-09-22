import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB6WSfREUfiwBEviZxCZAwNw6SGox2JLxg",
    authDomain: "book-project-d7594.firebaseapp.com",
    projectId: "book-project-d7594",
    storageBucket: "book-project-d7594.appspot.com",
    messagingSenderId: "622985426466",
    appId: "1:622985426466:web:2266d90329e7cf0cf23c7b",
    databaseURL: "https://book-project-d7594-default-rtdb.firebaseio.com/"
  };

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

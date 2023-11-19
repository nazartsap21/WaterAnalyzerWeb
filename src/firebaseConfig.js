import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBRe8bCQ1MigB4PI9hAgFnBLNt5vR2O288",
  authDomain: "sublime-mission-404920.firebaseapp.com",
  databaseURL: "https://sublime-mission-404920-default-rtdb.firebaseio.com",
  projectId: "sublime-mission-404920",
  storageBucket: "sublime-mission-404920.appspot.com",
  messagingSenderId: "589546934427",
  appId: "1:589546934427:web:4a5efa72d7d9d3c048f63e",
  measurementId: "G-ZM0PM6RH2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
export { database }
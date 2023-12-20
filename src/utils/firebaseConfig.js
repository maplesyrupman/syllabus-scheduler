import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAfihJ0Enmz0WpAWzstu34ywZ6RPX3uLp4",
    authDomain: "syllabus-scheduler.firebaseapp.com",
    projectId: "syllabus-scheduler",
    storageBucket: "syllabus-scheduler.appspot.com",
    messagingSenderId: "561817584374",
    appId: "1:561817584374:web:515a50331518ce56ca22d7",
    measurementId: "G-Y75DW1G9N6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;
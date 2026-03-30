// firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyBqGfdp2sYKLihqGFfqcIPz2qBb-CnLqbg",
    authDomain: "heritage-steel.firebaseapp.com",
    projectId: "heritage-steel",
    storageBucket: "heritage-steel.firebasestorage.app",
    messagingSenderId: "677213924786",
    appId: "1:677213924786:web:3b715f4355986a80be08ab",
    measurementId: "G-HDCREQVFXY"
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app, 'us-central1');
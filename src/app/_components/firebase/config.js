"use client";
// Import the functions you need from the SDKs you need
import { useEffect, useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//comment 2
const firebaseConfig = {
    apiKey: "AIzaSyCfKQM7csGyUXUQvoQmYbIivG_CStl8FTo",
    authDomain: "online-ticket-reservatio-1c3a2.firebaseapp.com",
    projectId: "online-ticket-reservatio-1c3a2",
    storageBucket: "online-ticket-reservatio-1c3a2.appspot.com",
    messagingSenderId: "558105195216",
    appId: "1:558105195216:web:f92f41561e686703a824d5",
    measurementId: "G-TGRBWP1Z2Q"
};

// Initialize Firebase
let app;
let auth;
let fireStore;
let googleAuth;
if (typeof window !== 'undefined') {
    // Initialize Firebase only if it hasn't been initialized yet
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }

    auth = getAuth(app);
    fireStore = getFirestore(app);
    googleAuth = new GoogleAuthProvider();
}

export { app, auth, fireStore, googleAuth };

// Create a hook to get the current user
export function useAuth() {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);
    console.log(currentUser, "user from config");

    useEffect(() => {
        // Check if we are running on the client side (browser)
        if (typeof window !== "undefined") {
            if (currentUser) {
                localStorage.setItem("current-user", JSON.stringify(currentUser)); // Save to localStorage
            } else {
                localStorage.removeItem("current-user"); // Optionally clear it when the user logs out or is null
            }
        }
    }, [currentUser]);
    return currentUser;
}

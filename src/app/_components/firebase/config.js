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
    apiKey: "AIzaSyCuxGUIgw09XxIf-QS8nbjNHAoHJEY4WaA",
    authDomain: "jetquinstravel-f82b4.firebaseapp.com",
    projectId: "jetquinstravel-f82b4",
    storageBucket: "jetquinstravel-f82b4.firebasestorage.app",
    messagingSenderId: "1035934248654",
    appId: "1:1035934248654:web:13e61f571cb84af882aa9f",
    measurementId: "G-QD7LZ890N7"
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

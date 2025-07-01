// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBbMEATFYaYbJVCrMpZEkPnuo0c5LRWFNg",
  authDomain: "ecopuce-f798d.firebaseapp.com",
  projectId: "ecopuce-f798d",
  storageBucket: "ecopuce-f798d.firebasestorage.app",
  messagingSenderId: "823599649833",
  appId: "1:823599649833:web:3889540673c7dbfc1df838",
  measurementId: "G-1198XWW80M",
}

export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
auth.languageCode = "es"

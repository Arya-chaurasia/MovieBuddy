
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDrwhRTXZu7bpLiBXgDM--jecU52JIj-Ns",
  authDomain: "netflix-gpt-8e61c.firebaseapp.com",
  projectId: "netflix-gpt-8e61c",
  storageBucket: "netflix-gpt-8e61c.firebasestorage.app",
  messagingSenderId: "279718129393",
  appId: "1:279718129393:web:17a05a53e42057369cc350",
  measurementId: "G-QRGN2BQ0M8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZxKXev_6IxhJcILWR4y2LjiqVY1BkA9s",
  authDomain: "ashwins-tech-blog.firebaseapp.com",
  projectId: "ashwins-tech-blog",
  storageBucket: "ashwins-tech-blog.firebasestorage.app",
  messagingSenderId: "491451945291",
  appId: "1:491451945291:web:0a2e7de044ab72b0f998ce",
  measurementId: "G-TRDB84FPBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const analytics = getAnalytics(app)

export default app

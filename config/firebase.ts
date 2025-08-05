// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { DEV_CONFIG } from "./development";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKiSkB6XoTjQg4nZhBWPLN8kEhICdP2yU",
  authDomain: "questionspouruncatho.firebaseapp.com",
  projectId: "questionspouruncatho",
  storageBucket: "questionspouruncatho.firebasestorage.app",
  messagingSenderId: "762800880851",
  appId: "1:762800880851:web:9a245733aab682be7be826",
  measurementId: "G-FGFHJSNH99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);

// Initialiser Firestore avec des paramètres optimisés pour Android
export const db = initializeFirestore(app, {
  cacheSizeBytes: DEV_CONFIG.firestore.cacheSizeBytes,
  experimentalForceLongPolling: DEV_CONFIG.firestore.experimentalForceLongPolling,
  useFetchStreams: DEV_CONFIG.firestore.useFetchStreams,
  ignoreUndefinedProperties: DEV_CONFIG.firestore.ignoreUndefinedProperties,
});

// Vérifier que Firebase est correctement initialisé
console.log('Firebase initialisé avec le projet:', firebaseConfig.projectId);
console.log('Auth domain:', firebaseConfig.authDomain);
console.log('Firestore configuré avec les paramètres Android');

// Initialize Analytics only on web
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
    console.log('Analytics initialisé');
  } catch (error) {
    console.log('Analytics not available:', error);
  }
}

export { analytics };
export default app; 
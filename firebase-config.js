// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyA-RbbSyD0WkPdWnMu6xRJbg8PMH1hNiJ4",
  authDomain: "doctor-1da43.firebaseapp.com",
  projectId: "doctor-1da43",
  storageBucket: "doctor-1da43.firebasestorage.app",
  messagingSenderId: "1033891757853",
  appId: "1:1033891757853:web:0df421cdf20ced3f01ebf4"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Configuração do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-RbbSyD0WkPdWnMu6xRJbg8PMH1hNiJ4",
  authDomain: "doctor-1da43.firebaseapp.com",
  projectId: "doctor-1da43",
  storageBucket: "doctor-1da43.appspot.com",
  messagingSenderId: "1033891757853",
  appId: "1:1033891757853:web:0df421cdf20ced3f01ebf4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Registro de usuário
async function register() {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const userType = document.getElementById("user-type").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email,
      userType
    });
    alert("Cadastro realizado com sucesso!");
  } catch (error) {
    alert("Erro no cadastro: " + error.message);
  }
}

// Login de usuário
async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login bem-sucedido!");
  } catch (error) {
    alert("Erro no login: " + error.message);
  }
}

export { register, login };

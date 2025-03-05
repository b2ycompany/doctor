// Importando os módulos necessários
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA-RbbSyD0WkPdWnMu6xRJbg8PMH1hNiJ4",
    authDomain: "doctor-1da43.firebaseapp.com",
    projectId: "doctor-1da43",
    storageBucket: "doctor-1da43.appspot.com",
    messagingSenderId: "1033891757853",
    appId: "1:1033891757853:web:0df421cdf20ced3f01ebf4"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função de cadastro
async function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Cadastro realizado com sucesso!");
    } catch (error) {
        alert("Erro: " + error.message);
    }
}

// Função de login
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login realizado com sucesso!");
    } catch (error) {
        alert("Erro: " + error.message);
    }
}

// Função de logout
async function logout() {
    try {
        await signOut(auth);
        alert("Você saiu com sucesso!");
    } catch (error) {
        alert("Erro ao sair: " + error.message);
    }
}

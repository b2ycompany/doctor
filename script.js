// Importando os módulos necessários
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
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

// Alterna entre login e cadastro
function toggleAuth() {
    const loginTitle = document.getElementById("login-title");
    const registerTitle = document.getElementById("register-title");
    const loginEmail = document.getElementById("login-email");
    const registerEmail = document.getElementById("register-email");
    const loginPassword = document.getElementById("login-password");
    const registerPassword = document.getElementById("register-password");
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");
    const loginLink = document.getElementById("login-link");

    const isLogin = loginTitle.classList.contains("hidden");

    loginTitle.classList.toggle("hidden", !isLogin);
    registerTitle.classList.toggle("hidden", isLogin);
    loginEmail.classList.toggle("hidden", !isLogin);
    registerEmail.classList.toggle("hidden", isLogin);
    loginPassword.classList.toggle("hidden", !isLogin);
    registerPassword.classList.toggle("hidden", isLogin);
    loginBtn.classList.toggle("hidden", !isLogin);
    registerBtn.classList.toggle("hidden", isLogin);
    loginLink.classList.toggle("hidden", isLogin);
}

// Função de cadastro
async function register() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Cadastro realizado com sucesso!");
    } catch (error) {
        alert("Erro: " + error.message);
    }
}

// Função de login
async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        document.getElementById("auth-section").classList.add("hidden");
        document.getElementById("welcome-section").classList.remove("hidden");
    } catch (error) {
        alert("Erro: " + error.message);
    }
}

// Função de logout
async function logout() {
    try {
        await signOut(auth);
        document.getElementById("welcome-section").classList.add("hidden");
        document.getElementById("auth-section").classList.remove("hidden");
    } catch (error) {
        alert("Erro ao sair: " + error.message);
    }
}

// Observa o estado de autenticação
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("auth-section").classList.add("hidden");
        document.getElementById("welcome-section").classList.remove("hidden");
    } else {
        document.getElementById("welcome-section").classList.add("hidden");
        document.getElementById("auth-section").classList.remove("hidden");
    }
});

// Adiciona eventos aos botões
document.getElementById("register-btn").addEventListener("click", register);
document.getElementById("login-btn").addEventListener("click", login);
document.getElementById("logout-btn").addEventListener("click", logout);

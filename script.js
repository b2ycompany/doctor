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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

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
function register() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert("Cadastro realizado com sucesso!"))
        .catch(error => alert("Erro: " + error.message));
}

// Função de login
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById("auth-section").classList.add("hidden");
            document.getElementById("welcome-section").classList.remove("hidden");
        })
        .catch(error => alert("Erro: " + error.message));
}

// Função de logout
function logout() {
    auth.signOut()
        .then(() => {
            document.getElementById("welcome-section").classList.add("hidden");
            document.getElementById("auth-section").classList.remove("hidden");
        })
        .catch(error => alert("Erro ao sair: " + error.message));
}

// Observa o estado de autenticação
auth.onAuthStateChanged(user => {
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

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA-RbbSyD0WkPdWnMu6xRJbg8PMH1hNiJ4",
    authDomain: "doctor-1da43.firebaseapp.com",
    projectId: "doctor-1da43",
    storageBucket: "doctor-1da43.appspot.com",
    messagingSenderId: "1033891757853",
    appId: "1:1033891757853:web:0df421cdf20ced3f01ebf4"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Elementos DOM
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const authSection = document.getElementById("auth-section");
const welcomeSection = document.getElementById("welcome-section");

// Troca entre login e cadastro
function toggleAuth() {
    document.getElementById("login-title").classList.toggle("hidden");
    document.getElementById("register-title").classList.toggle("hidden");
    loginEmail.classList.toggle("hidden");
    loginPassword.classList.toggle("hidden");
    loginBtn.classList.toggle("hidden");
    registerEmail.classList.toggle("hidden");
    registerPassword.classList.toggle("hidden");
    registerBtn.classList.toggle("hidden");
    document.getElementById("login-link").classList.toggle("hidden");
}

// Cadastro de usuário
registerBtn.onclick = () => {
    const email = registerEmail.value;
    const password = registerPassword.value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Cadastro realizado com sucesso!");
            toggleAuth();
        })
        .catch(error => alert("Erro no cadastro: " + error.message));
};

// Login de usuário
loginBtn.onclick = () => {
    const email = loginEmail.value;
    const password = loginPassword.value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            mostrarSecaoBemVindo();
        })
        .catch(error => alert("Erro no login: " + error.message));
};

// Logout de usuário
logoutBtn.onclick = () => {
    auth.signOut().then(() => {
        mostrarSecaoLogin();
    });
};

// Mostrar seção de boas-vindas após login
function mostrarSecaoBemVindo() {
    const container = document.querySelector(".container");
    if (container) {
        container.classList.add("hidden");
    }
    authSection.classList.add("hidden");
    welcomeSection.classList.remove("hidden");
}

// Mostrar seção de login após logout
function mostrarSecaoLogin() {
    const container = document.querySelector(".container");
    if (container) {
        container.classList.remove("hidden");
    }
    authSection.classList.remove("hidden");
    welcomeSection.classList.add("hidden");
}

// Verificar autenticação ao carregar a página
auth.onAuthStateChanged(user => {
    if (user) {
        mostrarSecaoBemVindo();
    } else {
        mostrarSecaoLogin();
    }
});

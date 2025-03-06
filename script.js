// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA-RbbSyD0WkPdWnMu6xRJbg8PMH1hNiJ4",
    authDomain: "doctor-1da43.firebaseapp.com",
    projectId: "doctor-1da43",
    storageBucket: "doctor-1da43.appspot.com",
    messagingSenderId: "1033891757853",
    appId: "1:1033891757853:web:0df421cdf20ced3f01ebf4"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Elementos DOM
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authBtn = document.getElementById("auth-btn");
const toggleText = document.getElementById("toggle-text");
const formTitle = document.getElementById("form-title");
const welcomeSection = document.getElementById("welcome-section");
const logoutBtn = document.getElementById("logout-btn");

let isLogin = true; // Controla o modo login/cadastro

// Alternar entre login e cadastro
function toggleAuth() {
    isLogin = !isLogin;
    if (isLogin) {
        formTitle.textContent = "Login";
        authBtn.textContent = "Entrar";
        toggleText.innerHTML = 'Não tem conta? <a href="#" onclick="toggleAuth()">Cadastre-se</a>';
    } else {
        formTitle.textContent = "Cadastro";
        authBtn.textContent = "Cadastrar";
        toggleText.innerHTML = 'Já tem conta? <a href="#" onclick="toggleAuth()">Entrar</a>';
    }
}

// Ação do botão de autenticação
authBtn.onclick = () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (isLogin) {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                alert("Login realizado com sucesso!");
                mostrarSecaoBemVindo();
            })
            .catch(error => alert("Erro: " + error.message));
    } else {
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => alert("Cadastro realizado com sucesso!"))
            .catch(error => alert("Erro: " + error.message));
    }
};

// Mostrar seção de boas-vindas após login
function mostrarSecaoBemVindo() {
    document.querySelector(".container").classList.add("hidden");
    welcomeSection.classList.remove("hidden");
}

// Logout
logoutBtn.onclick = () => {
    auth.signOut().then(() => {
        document.querySelector(".container").classList.remove("hidden");
        welcomeSection.classList.add("hidden");
    });
};

document.addEventListener("DOMContentLoaded", () => {
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

    // Função de cadastro
    function register() {
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert("Cadastro realizado com sucesso!");
                toggleAuth();
            })
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
                alert("Login realizado com sucesso!");
            })
            .catch(error => alert("Erro: " + error.message));
    }

    // Função de logout
    function logout() {
        auth.signOut().then(() => {
            document.getElementById("auth-section").classList.remove("hidden");
            document.getElementById("welcome-section").classList.add("hidden");
            alert("Você saiu da conta.");
        });
    }

    // Alterna entre login e cadastro
    function toggleAuth() {
        const isRegistering = document.getElementById("register-email").classList.contains("hidden");
        document.getElementById("register-email").classList.toggle("hidden", !isRegistering);
        document.getElementById("register-password").classList.toggle("hidden", !isRegistering);
        document.getElementById("register-btn").classList.toggle("hidden", !isRegistering);
        document.getElementById("register-title").classList.toggle("hidden", !isRegistering);
        document.getElementById("login-email").classList.toggle("hidden", isRegistering);
        document.getElementById("login-password").classList.toggle("hidden", isRegistering);
        document.getElementById("login-btn").classList.toggle("hidden", isRegistering);
        document.getElementById("login-link").classList.toggle("hidden", !isRegistering);
    }

    // Torna a função toggleAuth global
    window.toggleAuth = toggleAuth;

    // Adiciona eventos aos botões
    document.getElementById("register-btn").addEventListener("click", register);
    document.getElementById("login-btn").addEventListener("click", login);
    document.getElementById("logout-btn").addEventListener("click", logout);
});

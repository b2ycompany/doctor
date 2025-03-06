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

document.getElementById("login-btn").addEventListener("click", login);
document.getElementById("register-btn").addEventListener("click", register);
document.getElementById("logout-btn").addEventListener("click", logout);
document.getElementById("user-type").addEventListener("change", toggleUserType);

function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => window.location.href = "dashboard.html")
        .catch(error => alert(error.message));
}

function register() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const userType = document.getElementById("user-type").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            const userData = {
                type: userType,
                email: email
            };

            if (userType === "profissional") {
                userData.name = document.getElementById("prof-name").value;
                userData.crm = document.getElementById("prof-crm").value;
                userData.endereco = document.getElementById("prof-endereco").value;
                userData.especialidade = document.getElementById("prof-especialidade").value;
                userData.valorHora = document.getElementById("prof-valor-hora").value;
            } else if (userType === "empresa") {
                userData.nomeEmpresa = document.getElementById("emp-nome").value;
                userData.endereco = document.getElementById("emp-endereco").value;
                userData.especialidade = document.getElementById("emp-especialidade").value;
                userData.valorHora = document.getElementById("emp-valor-hora").value;
            }

            db.collection("users").doc(user.uid).set(userData)
                .then(() => alert("Cadastro realizado com sucesso!"))
                .catch(error => alert(error.message));
        })
        .catch(error => alert(error.message));
}

function logout() {
    auth.signOut().then(() => window.location.href = "index.html");
}

function toggleAuth() {
    document.getElementById("register-title").classList.toggle("hidden");
    document.getElementById("register-email").classList.toggle("hidden");
    document.getElementById("register-password").classList.toggle("hidden");
    document.getElementById("register-btn").classList.toggle("hidden");
    document.getElementById("login-link").classList.toggle("hidden");
    document.getElementById("login-title").classList.toggle("hidden");
    document.getElementById("login-email").classList.toggle("hidden");
    document.getElementById("login-password").classList.toggle("hidden");
    document.getElementById("login-btn").classList.toggle("hidden");
    document.getElementById("user-type").classList.toggle("hidden");
}

function toggleUserType() {
    const userType = document.getElementById("user-type").value;
    document.getElementById("profissional-form").classList.toggle("hidden", userType !== "profissional");
    document.getElementById("empresa-form").classList.toggle("hidden", userType !== "empresa");
}

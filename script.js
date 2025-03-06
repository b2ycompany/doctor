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

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");

loginBtn?.addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert(error.message));
});

registerBtn?.addEventListener("click", () => {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const tipoUsuario = document.getElementById("tipo-usuario").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const userId = userCredential.user.uid;
            db.collection("users").doc(userId).set({ tipo: tipoUsuario })
                .then(() => window.location.href = tipoUsuario + ".html");
        })
        .catch(error => alert(error.message));
});

function toggleAuth() {
    document.getElementById("login-title").classList.toggle("hidden");
    document.getElementById("register-title").classList.toggle("hidden");
    document.getElementById("login-email").classList.toggle("hidden");
    document.getElementById("login-password").classList.toggle("hidden");
    loginBtn.classList.toggle("hidden");

    document.getElementById("register-email").classList.toggle("hidden");
    document.getElementById("register-password").classList.toggle("hidden");
    document.getElementById("tipo-usuario").classList.toggle("hidden");
    registerBtn.classList.toggle("hidden");
    document.getElementById("login-link").classList.toggle("hidden");
}

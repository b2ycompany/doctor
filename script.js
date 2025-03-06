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

document.getElementById("register-btn").addEventListener("click", () => {
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

auth.onAuthStateChanged((user) => {
    if (user) {
        db.collection("users").doc(user.uid).get().then((doc) => {
            const tipo = doc.data().tipo;
            window.location.href = tipo + ".html";
        });
    }
});

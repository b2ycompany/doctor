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

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");

// Função de Login
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      db.collection("users").doc(userCredential.user.uid).get().then(doc => {
        if (doc.exists) {
          const tipo = doc.data().tipo;
          window.location.href = tipo === "medico" ? "medico.html" : "empresa.html";
        }
      });
    })
    .catch(error => alert("Erro: " + error.message));
});

// Função de Cadastro
registerBtn.addEventListener("click", () => {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const tipo = document.getElementById("register-tipo").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      return db.collection("users").doc(userCredential.user.uid).set({ email, tipo });
    })
    .then(() => alert("Cadastro realizado com sucesso!"))
    .catch(error => alert("Erro: " + error.message));
});

function toggleAuth() {
  document.getElementById("login-title").classList.toggle("hidden");
  document.getElementById("register-title").classList.toggle("hidden");
  document.getElementById("register-email").classList.toggle("hidden");
  document.getElementById("register-password").classList.toggle("hidden");
  document.getElementById("register-tipo").classList.toggle("hidden");
  document.getElementById("register-btn").classList.toggle("hidden");
}

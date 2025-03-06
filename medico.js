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
const db = firebase.firestore();
const auth = firebase.auth();

// Salvando cadastro do médico
const salvarBtn = document.getElementById("salvar-btn");
salvarBtn.addEventListener("click", () => {
  const user = auth.currentUser;
  if (user) {
    const especialidade = document.getElementById("especialidade").value;
    const valorHora = document.getElementById("valor-hora").value;
    const regioes = document.getElementById("regioes").value;
    const dias = document.getElementById("dias").value;
    const horario = document.getElementById("horario").value;

    db.collection("medicos").doc(user.uid).set({
      especialidade,
      valorHora,
      regioes,
      dias,
      horario
    }).then(() => {
      alert("Cadastro salvo com sucesso!");
    }).catch(error => {
      alert("Erro ao salvar: " + error.message);
    });
  } else {
    alert("Você precisa estar logado!");
  }
});

// Botão voltar
const voltarBtn = document.getElementById("voltar-btn");
voltarBtn.addEventListener("click", () => {
  window.location.href = "dashboard.html";
});

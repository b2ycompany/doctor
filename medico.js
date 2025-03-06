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

const especialidades = ["Cardiologia", "Ortopedia", "Pediatria", "Dermatologia", "Neurologia", "Psiquiatria"];

function sugerirEspecialidade() {
    const input = document.getElementById("prof-especialidade").value.toLowerCase();
    const sugestoes = especialidades.filter(especialidade => especialidade.toLowerCase().startsWith(input));
    const sugestoesDiv = document.getElementById("sugestoes-especialidade");
    sugestoesDiv.innerHTML = sugestoes.map(sugestao => `<div onclick="selecionarEspecialidade('${sugestao}')">${sugestao}</div>`).join("");
}

function selecionarEspecialidade(especialidade) {
    document.getElementById("prof-especialidade").value = especialidade;
    document.getElementById("sugestoes-especialidade").innerHTML = "";
}

function salvarProfissional() {
    const user = auth.currentUser;
    if (user) {
        const userData = {
            tipo: "profissional",
            nome: document.getElementById("prof-name").value,
            crm: document.getElementById("prof-crm").value,
            endereco: document.getElementById("prof-endereco").value,
            especialidade: document.getElementById("prof-especialidade").value,
            valorHora: document.getElementById("prof-valor-hora").value,
            diasDisponiveis: document.getElementById("prof-dias").value,
            horariosDisponiveis: document.getElementById("prof-horarios").value,
            tipoAtendimento: document.getElementById("prof-tipo-atendimento").value
        };

        db.collection("users").doc(user.uid).set(userData, { merge: true })
            .then(() => alert("Dados salvos com sucesso!"))
            .catch(error => alert(error.message));
    } else {
        alert("Usuário não autenticado!");
    }
}

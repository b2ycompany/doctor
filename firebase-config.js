// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyA-RbbSyD0WkPdWnMu6xRJbg8PMH1hNiJ4",
  authDomain: "doctor-1da43.firebaseapp.com",
  projectId: "doctor-1da43",
  storageBucket: "doctor-1da43.firebasestorage.app",
  messagingSenderId: "1033891757853",
  appId: "1:1033891757853:web:0df421cdf20ced3f01ebf4"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
// Estrutura para dashboard de médicos e empresas

// Função para salvar dados do médico
function salvarDadosMedico(uid, dados) {
    db.collection("medicos").doc(uid).set(dados)
        .then(() => alert("Dados do médico salvos com sucesso!"))
        .catch(error => alert("Erro ao salvar dados: " + error.message));
}

// Função para salvar dados da empresa
function salvarDadosEmpresa(uid, dados) {
    db.collection("empresas").doc(uid).set(dados)
        .then(() => alert("Dados da empresa salvos com sucesso!"))
        .catch(error => alert("Erro ao salvar dados: " + error.message));
}

// Função para buscar médicos com base em critérios
function buscarMedicos(especialidade, localidade, valorHora) {
    db.collection("medicos").where("especialidade", "==", especialidade)
        .where("localidade", "array-contains", localidade)
        .where("valorHora", "<=", valorHora)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => console.log(doc.data()));
        })
        .catch(error => console.log("Erro na busca: " + error.message));
} 

// Função para buscar oportunidades para médicos
function buscarOportunidades(especialidade, localidade) {
    db.collection("empresas").where("especialidade", "==", especialidade)
        .where("localidade", "array-contains", localidade)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => console.log(doc.data()));
        })
        .catch(error => console.log("Erro na busca: " + error.message));
}

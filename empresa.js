const db = firebase.firestore();
const auth = firebase.auth();

function salvarEmpresa() {
    const user = auth.currentUser;
    if (user) {
        const empresaData = {
            tipo: "empresa",
            nome: document.getElementById("empresa-nome").value,
            cnpj: document.getElementById("empresa-cnpj").value,
            especialidade: document.getElementById("empresa-especialidade").value,
            valorHora: document.getElementById("empresa-valor-hora").value,
            tipoAtendimento: document.getElementById("empresa-tipo-atendimento").value
        };

        db.collection("users").doc(user.uid).set(empresaData, { merge: true })
            .then(() => alert("Dados salvos com sucesso!"))
            .catch(error => alert(error.message));
    } else {
        alert("Usuário não autenticado!");
    }
}

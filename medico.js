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
    const db = firebase.firestore();

    // Cadastro do médico
    const form = document.getElementById("medico-form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const especialidade = document.getElementById("especialidade").value;
        const regioes = document.getElementById("regioes").value.split(",");
        const valorHora = parseFloat(document.getElementById("valor-hora").value);
        const diasDisponiveis = Array.from(document.querySelectorAll(".dias:checked")).map(el => el.value);
        const horaInicio = document.getElementById("hora-inicio").value;
        const horaFim = document.getElementById("hora-fim").value;

        try {
            await db.collection("medicos").add({
                nome,
                email,
                especialidade,
                regioes,
                valorHora,
                diasDisponiveis,
                horario: {
                    inicio: horaInicio,
                    fim: horaFim
                }
            });
            alert("Cadastro realizado com sucesso!");
            form.reset();
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            alert("Erro ao cadastrar. Tente novamente.");
        }
    });
});

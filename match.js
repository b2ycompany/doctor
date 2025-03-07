// Script para buscar propostas no Firebase
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();
const propostasList = document.getElementById("propostas-list");

async function carregarPropostas() {
  const user = auth.currentUser;
  if (!user) {
    alert("Você precisa estar logado para ver as propostas.");
    return;
  }

  try {
    const q = query(collection(db, "empresas"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const proposta = doc.data();
      const div = document.createElement("div");
      div.classList.add("proposta");
      div.innerHTML = `
        <h3>${proposta.nomeEmpresa}</h3>
        <p>Especialidade: ${proposta.especialidadeBuscada}</p>
        <p>Região: ${proposta.regiao}</p>
        <p>Valor Hora: R$${proposta.valorHora}</p>
        <p>Tipo de Atendimento: ${proposta.tipoAtendimento}</p>
        <button>Ver Detalhes</button>
      `;
      propostasList.appendChild(div);
    });
  } catch (error) {
    console.error("Erro ao carregar propostas:", error);
    alert("Erro ao carregar propostas.");
  }
}

window.onload = carregarPropostas;

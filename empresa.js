// Script para cadastro de empresas
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

const form = document.getElementById("empresa-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  const nomeEmpresa = document.getElementById("nome-empresa").value;
  const especialidadeBuscada = document.getElementById("especialidade-buscada").value;
  const regiao = document.getElementById("regiao-empresa").value;
  const valorHora = document.getElementById("valor-hora-empresa").value;
  const tipoAtendimento = document.getElementById("tipo-atendimento-empresa").value;

  try {
    const docRef = doc(db, "empresas", user.uid);
    await setDoc(docRef, { nomeEmpresa, especialidadeBuscada, regiao, valorHora, tipoAtendimento });
    alert("Cadastro realizado com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    alert("Erro ao cadastrar empresa.");
  }
});

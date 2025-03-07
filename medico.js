// Script para cadastro de profissionais
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

const form = document.getElementById("medico-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  const nome = document.getElementById("nome").value;
  const crm = document.getElementById("crm").value;
  const especialidade = document.getElementById("especialidade").value;
  const regiao = document.getElementById("regiao").value;
  const valorHora = document.getElementById("valor-hora").value;
  const tipoAtendimento = document.getElementById("tipo-atendimento").value;
  const curriculo = document.getElementById("curriculo").files[0];
  const diploma = document.getElementById("diploma").files[0];

  try {
    const docRef = doc(db, "profissionais", user.uid);
    await setDoc(docRef, { nome, crm, especialidade, regiao, valorHora, tipoAtendimento });

    const curriculoRef = ref(storage, `curriculos/${user.uid}.pdf`);
    await uploadBytes(curriculoRef, curriculo);
    const diplomaRef = ref(storage, `diplomas/${user.uid}.pdf`);
    await uploadBytes(diplomaRef, diploma);

    alert("Cadastro realizado com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    alert("Erro ao cadastrar profissional.");
  }
});

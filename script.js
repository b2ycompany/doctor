/ script.js
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const nameInput = document.getElementById("name");
const authButton = document.getElementById("auth-button");
const toggleForm = document.getElementById("toggle-form");
const formTitle = document.getElementById("form-title");
const errorMessage = document.getElementById("error-message");

let isRegistering = false;

toggleForm.addEventListener("click", () => {
    isRegistering = !isRegistering;
    formTitle.innerText = isRegistering ? "Cadastro" : "Login";
    authButton.innerText = isRegistering ? "Cadastrar" : "Entrar";
    toggleForm.innerText = isRegistering ? "Já tem uma conta? Faça login" : "Não tem uma conta? Cadastre-se";
    nameInput.style.display = isRegistering ? "block" : "none";
});

authButton.addEventListener("click", async () => {
    errorMessage.innerText = "";
    try {
        if (isRegistering) {
            const userCredential = await auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value);
            await db.collection("users").doc(userCredential.user.uid).set({
                name: nameInput.value,
                email: emailInput.value,
                role: "user"
            });
        } else {
            await auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value);
        }
        alert("Autenticação bem-sucedida!");
    } catch (error) {
        errorMessage.innerText = "Erro ao autenticar. Verifique suas credenciais.";
    }
});

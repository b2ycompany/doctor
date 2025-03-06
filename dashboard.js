const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged((user) => {
    if (user) {
        db.collection("users").doc(user.uid).get().then((doc) => {
            const tipo = doc.data().tipo;
            document.getElementById("conteudo").innerText = `Bem-vindo, ${tipo}!`;
        });
    } else {
        window.location.href = "index.html";
    }
});

function logout() {
    auth.signOut().then(() => window.location.href = "index.html");
}

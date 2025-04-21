const selectUsuario = document.querySelector("#usuario");
const inputSenha = document.querySelector("#senha");

async function pegarUsuarios() {
  try {
    const resposta = await fetch("../server/Login.php");

    if (!resposta.ok) {
      throw new Error("Erro:", resposta.status);
    }

    const dados = await resposta.json();

    const usuarios = dados.forEach((usuario, i) => {
      const optionUsuario = document.createElement("option");
      optionUsuario.setAttribute("value", usuario["Nome"]);
      optionUsuario.innerText = usuario["Nome"];
      selectUsuario.append(optionUsuario);
    });
  } catch (erro) {
    console.log("Ocorreu um erro:", erro);
  }
}

pegarUsuarios();

const btnEntrar = document.querySelector("#enter");
btnEntrar.addEventListener("click", (e) => {
  e.preventDefault();

  const usuario = selectUsuario.value.toLowerCase();
  const senha = inputSenha.value.toLowerCase();

  selectUsuario.value = "";
  inputSenha.value = "";

  const loading = document.querySelector("#loading");

  loading.style.display = "block";

  setTimeout(() => {
    loading.style.display = "none";
    location.href = "inicio.php";
  }, 2000);
});

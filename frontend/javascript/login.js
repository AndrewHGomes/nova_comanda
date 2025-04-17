async function getFetch() {
  try {
    const resposta = await fetch("../server/Login.php");
    if (!resposta.ok) {
      throw new Error("Erro:", resposta.status);
    }
    const dados = await resposta.json();
    console.log(dados);
  } catch (erro) {
    console.log("Ocorreu um erro:", erro);
  }
}

getFetch();

const btnEntrar = document.querySelector("#enter");
btnEntrar.addEventListener("click", (e) => {
  e.preventDefault();

  const selectUsuario = document.querySelector("#usuario");
  const inputSenha = document.querySelector("#senha");

  const usuario = selectUsuario.value.toLowerCase();
  const senha = inputSenha.value.toLowerCase();

  selectUsuario.value = "";
  inputSenha.value = "";
});

fetch("../server/Login.php")
  .then((resposta) => {
    if (!resposta.ok) {
      throw new Error("Erro na requisição: " + resposta.status);
    }
    return resposta;
  })
  .then((dados) => {
    try {
      console.log(dados);
    } catch (e) {
      console.error("Resposta não é um JSON válido:", dados);
    }
  })
  .catch((erro) => console.error("Erro:", erro));

const btnEntrar = document.querySelector("#enter");
btnEntrar.addEventListener("click", (e) => {
  e.preventDefault();

  const selectUsuario = document.querySelector("#usuario");
  const inputSenha = document.querySelector("#senha");

  const usuario = selectUsuario.value;
  const senha = inputSenha.value;

  console.log(usuario);
  console.log(senha);
});

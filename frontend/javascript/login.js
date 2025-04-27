let usuarios;
const selectUsuario = document.querySelector("#usuario");
const inputSenha = document.querySelector("#senha");

async function pegarUsuarios() {
  try {
    const resposta = await fetch("../server/Login.php");
    if (!resposta.ok) {
      throw new Error("Erro:", resposta.status);
    }

    usuarios = await resposta.json();

    usuarios.forEach((usuario) => {
      const optionUsuario = document.createElement("option");
      optionUsuario.setAttribute("value", usuario.Nome);
      optionUsuario.innerText = usuario.Nome;
      selectUsuario.append(optionUsuario);
    });
  } catch (erro) {
    console.log("Ocorreu um erro:", erro);
  }
}

pegarUsuarios();

const logado = [];

const btnEntrar = document.querySelector("#enter");
btnEntrar.addEventListener("click", (e) => {
  e.preventDefault();

  const usuario = selectUsuario.value;
  const senha = inputSenha.value;

  // usuarios.forEach((user) => {
  //   console.log(user);
  //   // if (
  //   //   user.Nome.toLowerCase() === usuario &&
  //   //   user.Senha.toLowerCase() === senha &&
  //   //   user.Permitido === "S"
  //   // ) {
  //   //   logado.push(user);
  //   // }
  // });

  selectUsuario.value = "";
  inputSenha.value = "";

  const loading = document.querySelector("#loading");

  loading.style.display = "block";

  setTimeout(() => {
    loading.style.display = "none";
    location.href = "index.php";
  }, 2000);
});

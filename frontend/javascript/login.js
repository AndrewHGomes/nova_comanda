async function pegarUsuarios() {
  const resposta = await fetch("../server/Login.php?pegarUsuarios");

  const arrayUsuarios = await resposta.json();

  const selectUsuario = document.getElementById("selectUsuario");

  arrayUsuarios.forEach((usuario) => {
    const option = document.createElement("option");
    option.value = usuario.Nome;
    option.textContent = usuario.Nome;
    selectUsuario.append(option);
  });

  const inputSenha = document.getElementById("inputSenha");
  const imgLoading = document.getElementById("imgLoading");

  const btnEnter = document.querySelector("#btnEnter");

  btnEnter.addEventListener("click", (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    imgLoading.style.display = "block";

    setTimeout(() => {
      imgLoading.style.display = "none";
      location.href = "./index.php";
    }, 2000);

    // if (usuarios) {
    //   const usuarioSelecionado = selectUsuario.value;
    //   const senhaDigitada = inputSenha.value;

    //   const usuario = usuarios.find((user) => {
    //     user.login === usuarioSelecionado && user.senha === senhaDigitada;
    //   });

    //   // imgLoading.style.display = "none";

    //   if (usuario) {
    //     console.log("Usuário autenticado!");
    //     setTimeout(() => {
    //       imgLoading.style.display = "block";
    //       location.href = "./index.php";
    //     }, 2000);
    //   } else {
    //     console.log("Credenciais inválidas.");
    //   }
    // } else {
    //   console.log("Erro: Usuários não foram carregados corretamente.");
    //   imgLoading.style.display = "none";
    // }
  });
}

//==============================================================

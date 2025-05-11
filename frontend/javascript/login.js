async function pegarUsuarios() {
  const resposta = await fetch("../server/Login.php?pegarUsuarios");

  const arrayUsuarios = await resposta.json();

  localStorage.setItem("usuarios", JSON.stringify(arrayUsuarios));

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
    console.log(usuarios);

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

// async function pegarHistoricoComanda() {
//   //
// }

//==============================================================

// async function pegarExigirNomeNaMesa() {
//   //
// }

//==============================================================

// async function pegarCalculoFracao() {
//   //
// }

//==============================================================

// async function pegarTipoDeComanda() {
//   //
// }

//==============================================================

// async function pegarCategorias() {
//   const resposta = await fetch("../server/Categorias.php?pegarCategorias");

//   const categorias = await resposta.json();
//   sessionStorage.setItem("categorias", JSON.stringify(categorias));
// }

//==============================================================

// async function pegarComplementos() {
//   const resposta = await fetch("../server/Complementos.php?pegarComplementos");

//   const complementos = await resposta.json();
//   sessionStorage.setItem("complementos", JSON.stringify(complementos));
// }

//==============================================================

// async function pegarGrupoComplemento() {
//   const resposta = await fetch(
//     "../server/GrupoComplemento.php?pegarGrupoComplemento"
//   );

//   const grupoComplemento = await resposta.json();
//   sessionStorage.setItem("grupoComplemento", JSON.stringify(grupoComplemento));
// }

//==============================================================

// async function pegarMercadorias() {
//   const resposta = await fetch("../server/Mercadorias.php?pegarMercadorias");

//   const mercadorias = await resposta.json();
//   sessionStorage.setItem("mercadorias", JSON.stringify(mercadorias));
// }

//==============================================================

// async function mostrarTotalHistoricoComanda() {
//   const resposta = await fetch(
//     "../server/MostrarTotalHistoricoComanda.php?mostrarTotalHistoricoComanda"
//   );

//   const historicoComanda = await resposta.json();
//   sessionStorage.setItem("historicoComanda", JSON.stringify(historicoComanda));
// }

//==============================================================

// async function obterParametroFracao() {
//   const resposta = await fetch(
//     "../server/ObterParametroFracao.php?obterParametroFracao"
//   );

//   const parametroFracao = await resposta.json();
//   sessionStorage.setItem("parametroFracao", JSON.stringify(parametroFracao));
// }

//==============================================================

// async function pegarSabores() {
//   const resposta = await fetch("../server/Sabores.php?pegarSabores");

//   const sabores = await resposta.json();
//   sessionStorage.setItem("sabores", JSON.stringify(sabores));
// }

//==============================================================

// async function pegarTaxaEntrega() {
//   const resposta = await fetch("../server/TaxaEntrega.php?pegarTaxaEntrega");

//   const taxaEntrega = await resposta.json();
//   sessionStorage.setItem("taxaEntrega", JSON.stringify(taxaEntrega));
// }

//==============================================================

// async function sincronizar() {
//   await Promise.all([
//     console.log("SINCRONIZANDO..."),
//     pegarUsuarios(),
//     pegarCategorias(),
//     pegarComplementos(),
//     pegarGrupoComplemento(),
//     pegarMercadorias(),
//     mostrarTotalHistoricoComanda(),
//     obterParametroFracao(),
//     pegarSabores(),
//     pegarTaxaEntrega(),
//   ]);
// }

//==============================================================

async function pegarUsuarios() {
  const resposta = await fetch("../server/Login.php?pegarUsuarios");

  const usuarios = await resposta.json();
  sessionStorage.setItem("usuarios", JSON.stringify(usuarios));
}

//==============================================================

async function pegarHistoricoComanda() {
  //
}

//==============================================================

async function pegarExigirNomeNaMesa() {
  //
}

//==============================================================

async function pegarCalculoFracao() {
  //
}

//==============================================================

async function pegarTipoDeComanda() {
  //
}

//==============================================================

async function pegarCategorias() {
  const resposta = await fetch("../server/Categorias.php?pegarCategorias");

  const categorias = await resposta.json();
  sessionStorage.setItem("categorias", JSON.stringify(categorias));
}

//==============================================================

async function pegarComplementos() {
  const resposta = await fetch("../server/Complementos.php?pegarComplementos");

  const complementos = await resposta.json();
  sessionStorage.setItem("complementos", JSON.stringify(complementos));
}

//==============================================================

async function pegarGrupoComplemento() {
  const resposta = await fetch(
    "../server/GrupoComplemento.php?pegarGrupoComplemento"
  );

  const grupoComplemento = await resposta.json();
  sessionStorage.setItem("grupoComplemento", JSON.stringify(grupoComplemento));
}

//==============================================================

async function pegarMercadorias() {
  const resposta = await fetch("../server/Mercadorias.php?pegarMercadorias");

  const mercadorias = await resposta.json();
  sessionStorage.setItem("mercadorias", JSON.stringify(mercadorias));
}

//==============================================================

async function mostrarTotalHistoricoComanda() {
  const resposta = await fetch(
    "../server/MostrarTotalHistoricoComanda.php?mostrarTotalHistoricoComanda"
  );

  const historicoComanda = await resposta.json();
  sessionStorage.setItem("historicoComanda", JSON.stringify(historicoComanda));
}

//==============================================================

async function obterParametroFracao() {
  const resposta = await fetch(
    "../server/ObterParametroFracao.php?obterParametroFracao"
  );

  const parametroFracao = await resposta.json();
  sessionStorage.setItem("parametroFracao", JSON.stringify(parametroFracao));
}

//==============================================================

async function pegarSabores() {
  const resposta = await fetch("../server/Sabores.php?pegarSabores");

  const sabores = await resposta.json();
  sessionStorage.setItem("sabores", JSON.stringify(sabores));
}

//==============================================================

async function pegarTaxaEntrega() {
  const resposta = await fetch("../server/TaxaEntrega.php?pegarTaxaEntrega");

  const taxaEntrega = await resposta.json();
  sessionStorage.setItem("taxaEntrega", JSON.stringify(taxaEntrega));
}

//==============================================================

async function sincronizar() {
  await Promise.all([
    console.log("SINCRONIZANDO..."),
    pegarUsuarios(),
    pegarCategorias(),
    pegarComplementos(),
    pegarGrupoComplemento(),
    pegarMercadorias(),
    mostrarTotalHistoricoComanda(),
    obterParametroFracao(),
    pegarSabores(),
    pegarTaxaEntrega(),
  ]);
}

//==============================================================

const btnEnter = document.querySelector("#btnEnter");

btnEnter.addEventListener("click", (e) => {
  e.preventDefault();
  sincronizar();

  const selectUsuario = document.getElementById("selectUsuario");
  const inputSenha = document.getElementById("inputSenha");
  const imgLoading = document.getElementById("imgLoading");

  console.log(selectUsuario.value);
  console.log(inputSenha.value);

  // imgLoading.style.display = "block";
  // setTimeout(() => {
  //   imgLoading.style.display = "none";
  //   location.href = "./index.php";
  // }, 2000);

  let usuarios = sessionStorage.getItem("usuarios");
  usuarios = JSON.parse(usuarios);

  usuarios.forEach((usuario) => {
    console.log(usuario);
  });
});

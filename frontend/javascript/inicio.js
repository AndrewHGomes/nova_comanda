async function pegarTipoComanda() {
  try {
    const resposta = await fetch("../server/Controles.php?acao=tipoDeComanda");
    if (!resposta.ok) {
      throw new Error("Erro:", resposta.status);
    }
    const dados = await resposta.json();
    console.log(dados);
  } catch (erro) {
    console.log("Ocorreu um erro:", erro);
  }
}

pegarTipoComanda();

const imgMenu = document.querySelector("#img-menu");

console.log(imgMenu);

imgMenu.addEventListener("click", () => {
  const menu = document.querySelector("#menu");

  if (menu.className === "invisivel") {
    menu.className = "visivel";
  } else {
    menu.className = "invisivel";
  }
});

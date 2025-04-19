const menu = document.querySelector("#menu");

async function pegarTipoComanda() {
  try {
    const resposta = await fetch("../server/Controles.php?tipoDeComanda");
    if (!resposta.ok) {
      throw new Error("Erro:", resposta.status);
    }
    const dados = await resposta.json();

    const parametroTipoComanda = dados[0];

    if (parametroTipoComanda && parametroTipoComanda === "P") {
      const linkComandaPorPessoa = document.createElement("a");
      linkComandaPorPessoa.setAttribute("href", "./portaria.php");
      linkComandaPorPessoa.innerText = "PORTARIA";

      menu.appendChild(linkComandaPorPessoa);

      const clientes = dados[1];

      clientes.forEach((cliente) => {
        console.log(cliente.CodigoComanda);
        console.log(cliente.Cliente);

        const comandaCliente = document.createElement("div");
        comandaCliente.setAttribute("id", "comandaCliente");
      });
    } else if (parametroTipoComanda && parametroTipoComanda === "M") {
      const mesas = dados[1];
    }
  } catch (erro) {
    console.log("Ocorreu um erro:", erro);
  }
}

pegarTipoComanda();

const imgMenu = document.querySelector("#img-menu");

imgMenu.addEventListener("click", () => {
  if (menu.className === "invisivel") {
    menu.className = "visivel";
  } else {
    menu.className = "invisivel";
  }
});

const imgMenu = document.querySelector("#img-menu");

imgMenu.addEventListener("click", () => {
  if (menu.className === "invisivel") {
    menu.className = "visivel";
  } else {
    menu.className = "invisivel";
  }
});

const menu = document.querySelector("#menu");
const main = document.querySelector("main");

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
        comandaCliente.setAttribute("class", "comandaCliente");

        const textoNumeroComanda = document.createElement("p");
        const textoNomeComanda = document.createElement("p");

        textoNumeroComanda.innerText = cliente.CodigoComanda;
        textoNomeComanda.innerText = cliente.Cliente;

        comandaCliente.append(textoNumeroComanda, textoNomeComanda);

        main.append(comandaCliente);
      });
    } else if (parametroTipoComanda && parametroTipoComanda === "M") {
      const mesas = dados[1];

      for (let i = 1; i <= mesas.NComandas; i++) {
        const comandaMesa = document.createElement("div");
        comandaMesa.setAttribute("class", "comandaMesa");

        const textoNumeroMesa = document.createElement("p");
        textoNumeroMesa.innerText = i;

        comandaMesa.append(textoNumeroMesa);
        main.append(comandaMesa);
      }
    }
  } catch (erro) {
    console.log("Ocorreu um erro:", erro);
  }
}

pegarTipoComanda();

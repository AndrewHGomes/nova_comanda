const imgMenu = document.querySelector("#img-menu");
const comandaSelecionada = document.querySelector("#selecionada");

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
    const resposta = await fetch("../server/TipoDeComanda.php?tipoDeComanda");
    if (!resposta.ok) {
      throw new Error("Erro:", resposta.status);
    }
    const dados = await resposta.json();

    const parametroTipoComanda = dados[0];

    if (parametroTipoComanda && parametroTipoComanda === "P") {
      const linkPortaria = document.createElement("a");
      linkPortaria.setAttribute("href", "./portaria.php");
      linkPortaria.innerText = "PORTARIA";

      menu.appendChild(linkPortaria);

      const clientes = dados[1];

      clientes.forEach((cliente) => {
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

      const mesasComandas = document.querySelectorAll(".comandaMesa");
      let mesaAnterior = null;

      mesasComandas.forEach((cadaMesa) => {
        cadaMesa.addEventListener("click", () => {
          if (mesaAnterior) {
            mesaAnterior.style.background = "";
          }

          cadaMesa.style.background = "#080";
          mesaAnterior = cadaMesa;

          comandaSelecionada.innerText = cadaMesa.innerText;
        });
      });

      comandaSelecionada.addEventListener("click", (e) => {
        if (e.target.innerText === "" || e.target.innerText === undefined) {
          alert("SELECIONE UMA COMANDA...");
        } else {
          location.href = "./historico.php";
        }
      });
    }
  } catch (erro) {
    console.log("Ocorreu um erro:", erro);
  }
}

pegarTipoComanda();

pegarTipoDeComanda();
headerFuncional();
montarMainContent();

async function pegarTipoDeComanda() {
  try {
    const resposta = await fetch("../server/TipoDeComanda.php?tipoDeComanda");
    if (!resposta.ok) {
      throw new Error("Erro:", resposta.status);
    }

    const objTipoComanda = await resposta.json();

    localStorage.setItem("tipoDeComanda", JSON.stringify(objTipoComanda));
  } catch (erro) {
    console.log(erro);
  }
}

//======================================================================================

function headerFuncional() {
  const verTipoComanda = JSON.parse(localStorage.getItem("tipoDeComanda"));
  const tipo = verTipoComanda[0];

  const imgMenu = document.querySelector("#img-menu");
  const menu = document.querySelector("#menu");

  imgMenu.addEventListener("click", () => {
    if (menu.className === "invisivel") {
      menu.className = "visivel";
    } else {
      menu.className = "invisivel";
    }
  });

  const linkPortaria = document.createElement("a");
  linkPortaria.setAttribute("href", "./portaria.php");
  linkPortaria.innerText = "PORTARIA";

  if (tipo === "C") {
    menu.appendChild(linkPortaria);
  }

  pesquisarComandas();
}

//======================================================================================

function pesquisarComandas() {
  const inputPesquisa = document.querySelector("#bottomHeader > input");

  inputPesquisa.addEventListener("input", () => {
    const pesquisa = inputPesquisa.value.toUpperCase().trim();

    const divMain = document.querySelectorAll("main > div");

    divMain.forEach((div) => {
      const paragrafosDiv = div.querySelectorAll("p");

      let encontrado = false;

      paragrafosDiv.forEach((paragrafo) => {
        const texto = paragrafo.innerText.toUpperCase().trim();

        if (texto.includes(pesquisa)) {
          encontrado = true;
        }
      });

      if (!encontrado) {
        div.classList.add("invisivel");
      } else {
        div.classList.remove("invisivel");
      }
    });
  });
}

//======================================================================================

function exibirMesas() {
  const objMesas = JSON.parse(localStorage.getItem("tipoDeComanda"));
  const main = document.querySelector("main");

  const quantidadeDeMesas = objMesas[1].NComandas;

  for (let i = 1; i <= quantidadeDeMesas; i++) {
    const divMesa = document.createElement("div");
    divMesa.setAttribute("class", "divMesa");

    const texto = document.createElement("p");
    texto.textContent = i;

    divMesa.append(texto);
    main.appendChild(divMesa);
  }

  const mesaSelecionada = document.querySelector("#selecionada");
  const divMesa = document.querySelectorAll(".divMesa");
  let mesaAnterior = null;

  divMesa.forEach((cadaMesa) => {
    cadaMesa.addEventListener("click", () => {
      if (mesaAnterior) {
        mesaAnterior.style.background = "";
      }

      cadaMesa.style.background = "#000";
      mesaAnterior = cadaMesa;

      mesaSelecionada.textContent = cadaMesa.textContent;
    });
  });
}

//======================================================================================

function exibirComandas() {
  const objComandas = JSON.parse(localStorage.getItem("tipoDeComanda"));
  const main = document.querySelector("main");

  const arrayDeClientes = objComandas[1];

  arrayDeClientes.forEach((objCliente) => {
    const nomeCliente = objCliente.Cliente;
    const codigoComanda = objCliente.CodigoComanda;

    const divComanda = document.createElement("div");
    divComanda.setAttribute("class", "divComanda");

    const texto1 = document.createElement("p");
    texto1.textContent = codigoComanda;
    texto1.style.fontWeight = "bold";

    const texto2 = document.createElement("p");
    texto2.textContent = nomeCliente;

    divComanda.append(texto1, texto2);

    main.appendChild(divComanda);
  });

  const comandaSelecionada = document.querySelector("#selecionada");
  const divComanda = document.querySelectorAll(".divComanda");
  let comandaAnterior = null;

  divComanda.forEach((cadaComanda) => {
    cadaComanda.addEventListener("click", () => {
      if (comandaAnterior) {
        comandaAnterior.style.background = "";
      }

      cadaComanda.style.background = "#000";
      comandaAnterior = cadaComanda;

      comandaSelecionada.textContent = cadaComanda.firstChild.textContent;
    });
  });
}

//======================================================================================

function montarMainContent() {
  const objParametro = JSON.parse(localStorage.getItem("tipoDeComanda"));

  const tipoDeComanda = objParametro[0];

  if (tipoDeComanda === "M") {
    exibirMesas();
  } else if (tipoDeComanda === "C") {
    exibirComandas();
  }
}

//======================================================================================

function storageMesaOuComanda() {
  const selecionada = document.querySelector("#selecionada");

  selecionada.addEventListener("click", (e) => {
    if (e.target.innerText === "" || e.target.innerText === undefined) {
      alert("SELECIONE UMA COMANDA...");
    } else {
      location.href = "./historico.php";
    }
  });
}

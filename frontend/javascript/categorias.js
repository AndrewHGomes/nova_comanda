headerFuncional();
montarMainContent();

//======================================================================================

async function pegarCategorias() {
  try {
    const resposta = await fetch("../server/Categorias.php?pegarCategorias");
    if (!resposta.ok) {
      throw new Error("Erro:", resposta.status);
    }

    const arrayCategorias = await resposta.json();

    localStorage.setItem("categorias", JSON.stringify(arrayCategorias));

    console.log("Categorias");
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

  pesquisarCategorias();
}

//======================================================================================

function pesquisarCategorias() {
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

function exibirCategorias() {
  const main = document.querySelector("main");
  const arrayCategorias = JSON.parse(localStorage.getItem("categorias"));
  console.log(arrayCategorias);

  arrayCategorias.forEach((categoria, i) => {
    const divCategoria = document.createElement("div");
    divCategoria.setAttribute("class", "divCategoria");

    const textoCategoria = document.createElement("p");
    textoCategoria.innerText = categoria.Descricao;

    const imgCategoria = document.createElement("img");
    imgCategoria.setAttribute("src", `./img/${i}.png`);

    divCategoria.append(textoCategoria, imgCategoria);
    main.append(divCategoria);
  });

  paginacaoCategorias(arrayCategorias);
}

//======================================================================================

function paginacaoCategorias(categorias) {
  const divCategoria = document.querySelectorAll(".divCategoria");

  divCategoria.forEach((cadaCategoria, i) => {
    cadaCategoria.addEventListener("click", () => {
      const nomeCategoria = categorias[i].Descricao;
      const tipoDePizza = categorias[i].Descricao;

      if (categorias[i].Codigo === 1 || categorias[i].Codigo === 2) {
        location.href = `./pizza.php?tipoDePizza=${tipoDePizza}`;
      } else {
        location.href = `./mercadorias.php?nomecategoria=${nomeCategoria}`;
      }
    });
  });
}

//======================================================================================

function montarMainContent() {
  exibirCategorias();
}

//======================================================================================

function limparStorage() {
  localStorage.clear();
  sessionStorage.clear();
}

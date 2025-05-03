const comandaSelecionada = document.querySelector("#selecionada");
const main = document.querySelector("main");
const imgMenu = document.querySelector("#img-menu");

imgMenu.addEventListener("click", () => {
  if (menu.className === "invisivel") {
    menu.className = "visivel";
  } else {
    menu.className = "invisivel";
  }
});

async function pegarCategorias() {
  const resposta = await fetch("../server/Categorias.php?pegarCategorias");
  if (!resposta.ok) {
    throw new Error("Erro:", resposta.status);
  }

  const categorias = await resposta.json();

  categorias.forEach((categoria, i) => {
    const divCategoria = document.createElement("div");
    divCategoria.setAttribute("class", "divCategoria");

    const textoCategoria = document.createElement("p");
    textoCategoria.innerText = categoria.Descricao;

    const imgCategoria = document.createElement("img");
    imgCategoria.setAttribute("src", `./img/${i}.png`);

    divCategoria.append(textoCategoria, imgCategoria);
    main.append(divCategoria);
  });

  const categoriasDiv = document.querySelectorAll(".divCategoria");

  categoriasDiv.forEach((cadaCategoria, i) => {
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

pegarCategorias();

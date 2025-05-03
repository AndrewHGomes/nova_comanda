const main = document.querySelector("main");

async function pegarPizza() {
  const resposta = await fetch("../server/Mercadorias.php");
  if (!resposta.ok) {
    throw new Error("Erro:", resposta.status);
  }

  const tudo = await resposta.json();

  const queryUrl = new URL(location.href);
  const pizzasUrl = queryUrl.search.slice(13);
  let limparUrlPizza = pizzasUrl.replaceAll("%20", " ");

  tudo.forEach((produto, i) => {
    const codigoGrupo = produto.Grupo;
    const nomeCategoria = produto.Descricao;

    if (codigoGrupo === 2 && limparUrlPizza === "PIZZAS") {
      const divPizza = document.createElement("div");
      divPizza.setAttribute("class", "divPizza");

      const textoDescricao = document.createElement("p");
      textoDescricao.innerText = produto.Descricao;

      divPizza.append(textoDescricao);
      main.append(divPizza);

      divPizza.addEventListener("click", () => {
        location.href = `./mercadorias.php?nomecategoria=${nomeCategoria}`;
      });
    }

    if (codigoGrupo === 4 && limparUrlPizza === "PIZZAS MISTAS") {
      const divPizza = document.createElement("div");
      divPizza.setAttribute("class", "divPizza");

      const textoDescricao = document.createElement("p");
      textoDescricao.innerText = produto.Descricao;

      divPizza.append(textoDescricao);
      main.append(divPizza);

      divPizza.addEventListener("click", () => {
        location.href = `./mercadorias.php?nomecategoria=${nomeCategoria}`;
      });
    }
  });
}

pegarPizza();

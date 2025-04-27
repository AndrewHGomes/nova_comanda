const main = document.querySelector("main");

async function pegarPizza() {
  const resposta = await fetch("../server/Mercadorias.php");
  if (!resposta.ok) {
    throw new Error("Erro:", resposta.status);
  }

  const pizzas = await resposta.json();

  pizzas.forEach((tipo, i) => {
    if (tipo.Grupo === 2) {
      const tipoDePizza = tipo.categoria;

      const divPizza = document.createElement("div");
      divPizza.setAttribute("class", "divPizza");

      const textoDescricao = document.createElement("p");
      textoDescricao.innerText = tipo.Descricao;

      divPizza.append(textoDescricao);
      main.append(divPizza);

      divPizza.addEventListener("click", () => {
        location.href = `./mercadorias.php?nomecategoria=${tipoDePizza}`;
      });
    }
  });
}

pegarPizza();

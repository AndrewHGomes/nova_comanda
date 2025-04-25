const tituloPagina = document.querySelector("header > div > h3");

const main = document.querySelector("main");

const imgIdMinus = document.querySelector("#imgIdMinus");
const imgIdPlus = document.querySelector("#imgIdPlus");

const inputIdQuantidade = document.querySelector("#inputIdQuantidade");

imgIdMinus.addEventListener("click", () => {
  if (inputIdQuantidade.value > 1) {
    inputIdQuantidade.value--;
  }
});

imgIdPlus.addEventListener("click", () => {
  inputIdQuantidade.value++;
});

async function pegarMercadorias() {
  const resposta = await fetch("../server/Mercadorias.php");
  if (!resposta.ok) {
    throw new Error("Erro:", resposta.status);
  }

  const mercadorias = await resposta.json();

  const queryUrl = new URL(location.href);
  const mercadoriaUrl = queryUrl.search.slice(15);
  let limparUrl = mercadoriaUrl.replaceAll("%20%20", " ");
  limparUrl = mercadoriaUrl.replaceAll("%20", " ");

  tituloPagina.innerText = limparUrl;

  mercadorias.forEach((mercadoria) => {
    if (mercadoria.categoria === limparUrl && mercadoria.Complemento === "N") {
      const divMercadoria = document.createElement("div");
      divMercadoria.setAttribute("class", "divMercadoria");

      const divDescricao = document.createElement("div");
      divDescricao.setAttribute("class", "divDescricao");

      const spanDescricao = document.createElement("span");
      spanDescricao.innerText = mercadoria.Descricao;

      const spanQuantidade = document.createElement("span");
      spanQuantidade.setAttribute("class", "spanQuantidade");

      const plusImg = document.createElement("img");
      plusImg.setAttribute("src", "./img/plus.png");
      plusImg.setAttribute("class", "imgClassPlus");

      const inputQuantidade = document.createElement("input");
      inputQuantidade.setAttribute("class", "inputClassQuantidade");
      inputQuantidade.setAttribute("disabled", "");
      inputQuantidade.value = 0;

      const minusImg = document.createElement("img");
      minusImg.setAttribute("src", "./img/minus.png");
      minusImg.setAttribute("class", "imgClassMinus");

      spanQuantidade.append(minusImg, inputQuantidade, plusImg);

      const divComplemento = document.createElement("div");
      divComplemento.setAttribute("class", "divComplemento");

      const btnComplemeto = document.createElement("button");
      btnComplemeto.setAttribute("class", "btnComplemento");
      btnComplemeto.innerText = "COMPLEMENTOS";

      divDescricao.append(spanDescricao, spanQuantidade);

      if (mercadoria.RequerComplemento === "S") {
        divComplemento.append(btnComplemeto);
        divMercadoria.append(divDescricao, divComplemento);
      } else {
        divMercadoria.append(divDescricao);
      }

      main.append(divMercadoria);
    }
  });

  const inputClassQuantidade = document.querySelectorAll(
    ".inputClassQuantidade"
  );

  const imgClassMinus = document.querySelectorAll(".imgClassMinus");
  imgClassMinus.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (inputClassQuantidade[i].value > 0) {
        inputClassQuantidade[i].value--;
      }
    });
  });

  const imgClassPlus = document.querySelectorAll(".imgClassPlus");
  imgClassPlus.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      inputClassQuantidade[i].value++;
    });
  });
}

pegarMercadorias();

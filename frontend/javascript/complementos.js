const main = document.querySelector("main");

async function pegarComplementos() {
  const resposta = await fetch("../server/Complementos.php");
  if (!resposta.ok) {
    throw new Error("Erro:", resposta.status);
  }

  const complementos = await resposta.json();

  complementos.forEach((complemento) => {
    const divComplemento = document.createElement("div");
    divComplemento.setAttribute("class", "divComplemento");

    const divInfo = document.createElement("div");
    divInfo.setAttribute("class", "divInfo");

    const spanComplemento = document.createElement("span");
    spanComplemento.setAttribute("class", "spanComplemento");
    spanComplemento.innerText = complemento.Descricao;

    const spanAdicionar = document.createElement("span");
    spanAdicionar.setAttribute("class", "spanAdicionar");

    const imgMinus = document.createElement("img");
    imgMinus.setAttribute("src", "./img/minus.png");

    const inputQtdComplemento = document.createElement("input");
    inputQtdComplemento.setAttribute("class", "inputQtdComplemento");
    inputQtdComplemento.setAttribute("disabled", "");
    inputQtdComplemento.value = 0;

    const imgPlus = document.createElement("img");
    imgPlus.setAttribute("src", "./img/plus.png");

    const divPreco = document.createElement("div");
    divPreco.setAttribute("class", "divPreco");

    const spanPreco = document.createElement("span");
    spanPreco.innerText = `R$ ${Number(complemento.Venda).toFixed(2)}`;

    spanAdicionar.append(imgMinus, inputQtdComplemento, imgPlus);
    divInfo.append(spanComplemento, spanAdicionar);
    divPreco.append(spanPreco);
    divComplemento.append(divInfo, divPreco);
    main.append(divComplemento);
  });
}

pegarComplementos();

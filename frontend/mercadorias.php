<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="./img/icone.png">
  <link rel="stylesheet" href="./css/global.css">
  <link rel="stylesheet" href="./css/mercadorias.css">
  <script src="./javascript/mercadorias.js" defer></script>
  <title>PRODUTOS</title>
</head>

<body>
  <header>
    <a href="javascript:history.back()">
      <img src="./img/voltar.png">
    </a>
    <input type="text" id="pesquisarMercadoria" placeholder="PESQUISAR PRODUTO">
    <span class="invisivel">1/1</span>
  </header>
  <main>
    <h3></h3>
  </main>
  <footer>
    <div id="infoCliente">
      <input type="text" placeholder="CLIENTE">
      <textarea rows="1" name="observacoes" id="observacoes" placeholder="OBSERVAÇÕES"></textarea>
    </div>
    <div id="quantidade">
      <span class="invisivel">
        <img src="./img/minus.png" id="imgIdMinus">
        <input type="number" value="1" id="inputIdQuantidade" disabled>
        <img src="./img/plus.png" id="imgIdPlus">
      </span>
      <button>ADICIONAR</button>
    </div>
  </footer>
</body>

</html>
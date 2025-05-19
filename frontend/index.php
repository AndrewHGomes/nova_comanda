<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="./img/icone.png">
  <link rel="stylesheet" href="./css/global.css">
  <link rel="stylesheet" href="./css/index.css">
  <script src="./javascript/index.js" defer></script>
  <title>INÍCIO</title>
</head>

<body onload="pegarTipoDeComanda()">
  <header>
    <div id="topHeader">
      <img src="./img/img-menu.jpg" id="img-menu">
      <div id="menu" class="invisivel">
        <a href="./login.php" onclick="limparStorage()">ATUALIZAR</a>
      </div>
      <h2>
        <a href="./categorias.php">CATEGORIAS</a>
      </h2>
      <div id="selecionada"></div>
    </div>
    <div id="bottomHeader">
      <input type="text" placeholder="PESQUISAR COMANDA">
    </div>
  </header>
  <main></main>
  <footer>
    <h3>USUÁRIO: </h3>
  </footer>
</body>

</html>
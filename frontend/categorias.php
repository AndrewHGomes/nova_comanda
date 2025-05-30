<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="./img/icone.png">
  <link rel="stylesheet" href="./css/global.css">
  <link rel="stylesheet" href="./css/categorias.css">
  <script src="./javascript/categorias.js" defer></script>
  <title>CATEGORIAS</title>
</head>

<body onload="pegarCategorias()">
  <header>
    <div id="topHeader">
      <img src="./img/img-menu.jpg" id="img-menu">
      <div id="menu" class="invisivel">
        <a href="./login.php" onclick="limparStorage()">ATUALIZAR</a>
      </div>
      <h2>
        <a href="./index.php">INÍCIO</a>
      </h2>
      <div id="selecionada"></div>
    </div>
    <div id="bottomHeader">
      <input type="text" placeholder="PESQUISAR CATEGORIA">
    </div>
  </header>
  <main></main>
  <footer>
    <h3>USUÁRIO: </h3>
  </footer>
</body>

</html>
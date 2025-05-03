<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="./img/icone.png">
  <link rel="stylesheet" href="./css/global.css">
  <link rel="stylesheet" href="./css/portaria.css">
  <script src="./javascript/portaria.js" defer></script>
  <title>CONTROLE PORTARIA</title>
</head>

<body>
  <h1>SICOMANDA</h1>

  <a href="./index.php">VOLTAR</a>

  <form method="POST" action="">

    <input type="text" id="codigo-comanda" placeholder="NÚMERO DA COMANDA">

    <input type="text" id="cliente" placeholder="NOME DO CLIENTE">

    <input type="text" id="telefone" placeholder="NÚMERO DE TELEFONE">

    <button id="enviar">ENVIAR</button>

  </form>

  <div id="empresa">
    <img src="./img/daffari.jpeg" id="logo">
    <h3>D'affari Sistemas de Informação</h3>
  </div>
</body>

</html>
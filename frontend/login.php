<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="./img/icone.png">
  <link rel="stylesheet" href="./css/global.css">
  <link rel="stylesheet" href="./css/login.css">
  <script src="./javascript/login.js" defer></script>
  <title>LOGIN</title>
</head>

<body>
  <h1>SICOMANDA</h1>

  <form method="POST" action="">

    <select id="usuario">
      <option value="">SELECIONE UM USUARIO</option>
    </select>

    <input type="password" placeholder="SENHA" id="senha" autocomplete="off" placeholder="SENHA">
    <button id="enter">ACESSAR</button>

    <a href="login.php" id="refresh">
      <img src="img/refresh.png" id="img-refresh">
    </a>

  </form>

  <div id="empresa">
    <img src="./img/daffari.jpeg" id="logo">
    <h3>D'affari Sistemas de Informação</h3>
  </div>

  <script>
    console.log(<?php $login->pegarUsuarios() ?>);
  </script>
</body>

</html>
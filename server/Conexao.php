<?php

// header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Headers: Content-Type, Authorization');
// header('Content-Type: application/json');

class Conexao
{
  public $pdo;

  public function __construct()
  {
    date_default_timezone_set("America/Fortaleza");
    $this->conectar();
  }

  public function conectar()
  {
    try {
      $this->pdo = new PDO("mysql:host=127.0.0.1;dbname=sicomercio_fornalha;charset=utf8", "root", "");
      $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
      // echo "<p>Conexão estabelecida</p>";
    } catch (PDOException $e) {
      echo "<p>Algo errado com a conexão: {$e->getMessage()}</p>";
    }
  }
}

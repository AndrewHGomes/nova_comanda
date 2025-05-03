<?php

header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");
header("Content-Type: application/json");

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
      $this->pdo = new PDO("mysql:host=127.0.0.1;dbname=sicomercio_teste;charset=latin1", "root", "");
      $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
      echo $e->getMessage();
    }
  }
}

$conexao = new Conexao;
$conexao->conectar();

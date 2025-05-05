<?php

require_once "Conexao.php";

class ExigirNomeNaMesa extends Conexao
{
  private $pdo;

  public function __construct()
  {
    $this->pdo = Conexao::conexaoUtf8();
  }

  public function exigirNomeNaMesa()
  {
    try {
      $sql = $this->pdo->prepare("SELECT * FROM sis_parametro WHERE Nome = 'ExigirNomeNaMesa'");

      $sql->execute();

      $array = $sql->fetchAll(\PDO::FETCH_ASSOC)[0]['Valor'];

      echo json_encode($array);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }
}

$exigirNomeNaMesa = new ExigirNomeNaMesa;

$exigirNomeNaMesa->exigirNomeNaMesa();

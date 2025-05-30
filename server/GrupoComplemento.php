<?php

require_once "Conexao.php";

class GrupoComplemento extends Conexao
{
  private $pdo;

  public function __construct()
  {
    $this->pdo = Conexao::conexaoUtf8();
  }

  public function pegarGrupoComplemento()
  {
    try {
      $sql = $this->pdo->prepare("SELECT * FROM grupocomp");

      $sql->execute();

      $array = $sql->rowCount() ? $sql->fetchAll(\PDO::FETCH_ASSOC) : [];

      echo json_encode($array);
    } catch (PDOException $e) {

      echo "<p>{$e->getMessage()}</p>";
    }
  }
}

$grupoComplemento = new GrupoComplemento;

$grupoComplemento->pegarGrupoComplemento();

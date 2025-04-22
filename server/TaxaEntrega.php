<?php

require_once "Conexao.php";

class TaxaEntrega extends Conexao
{
  public function __construct()
  {
    parent::__construct();
  }

  public function pegarTaxaEntrega()
  {
    try {
      $sql = $this->pdo->prepare("SELECT Valor FROM sis_parametro WHERE Nome = 'ValorTaxaEntrega'");

      $sql->execute();

      $array = $sql->fetchAll(\PDO::FETCH_ASSOC)[0];

      echo json_encode($array);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }
}

$taxaEntrega = new TaxaEntrega;

$taxaEntrega->pegarTaxaEntrega();

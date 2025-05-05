<?php

require_once "Conexao.php";

class MostrarTotalHistoricoComanda extends Conexao
{
  private $pdo;

  public function __construct()
  {
    $this->pdo = Conexao::conexaoUtf8();
  }

  public function mostrarTotalHistoricoComanda()
  {
    try {
      $sql = $this->pdo->prepare("SELECT * FROM sis_parametro WHERE Nome = 'MostrarTotalHistoricoComanda'");

      $sql->execute();

      $array = $sql->fetchAll(\PDO::FETCH_ASSOC)[0]['Valor'];

      echo json_encode($array);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }
}

$mostrarTotalHistoricoComanda = new MostrarTotalHistoricoComanda;

$mostrarTotalHistoricoComanda->mostrarTotalHistoricoComanda();

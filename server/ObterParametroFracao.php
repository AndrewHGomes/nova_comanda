<?php

require_once "Conexao.php";

class ObterParametroFracao extends Conexao
{
  public function __construct()
  {
    parent::__construct();
  }

  public function obterParametroFracao()
  {
    try {
      $sql = $this->pdo->prepare("SELECT valor FROM sis_parametro WHERE nome = 'CalculoFracao'");

      $sql->execute();

      $array = $sql->fetch(PDO::FETCH_ASSOC)['valor'];

      echo json_encode($array);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }
}

$obterParametroFracao = new ObterParametroFracao;

$obterParametroFracao->obterParametroFracao();

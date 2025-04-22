<?php

require_once "Conexao.php";

class Sabores extends Conexao
{
  public function __construct()
  {
    parent::__construct();
  }

  public function pegarSabores()
  {
    try {
      $sql = $this->pdo->prepare("SELECT mercadorias.Descricao as DescMerc,mercadorias.Observacao, sabores.*, 0 as quantidade FROM sabores INNER JOIN mercadorias ON (mercadorias.Codigo = sabores.idSabor)");

      $sql->execute();

      $array = $sql->rowCount() ? $sql->fetchAll(\PDO::FETCH_ASSOC) : [];

      echo json_encode($array);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }
}

$sabores = new Sabores;

$sabores->pegarSabores();

<?php

require_once "Conexao.php";

class Complementos extends Conexao
{
  private $pdo;

  public function __construct()
  {
    $this->pdo = Conexao::conexaoUtf8();
  }

  public function pegarComplementos()
  {
    try {
      $sql = $this->pdo->prepare("SELECT mercadorias.Codigo as CodMerc, mercadorias.Descricao, mercadorias.Venda, mercadorias.Complemento, mercadorias.Grupo FROM mercadorias WHERE mercadorias.Ativo = 'S' AND Comanda = 'S' AND mercadorias.Complemento = 'S' GROUP BY mercadorias.Codigo ORDER BY mercadorias.Grupo ASC
			");

      $sql->execute();

      $array = $sql->rowCount() ? $sql->fetchAll(\PDO::FETCH_ASSOC) : [];

      echo json_encode($array);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }
}

$complementos = new Complementos;

$complementos->pegarComplementos();

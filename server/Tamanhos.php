<?php

require_once "Conexao.php";

class Tamanhos extends Conexao
{
  public function __construct()
  {
    parent::__construct();
  }

  public function pegarTamanhos()
  {
    try {
      $sql = $this->pdo->prepare("SELECT precostamanho.*,mercadorias.Codigo AS CodTbMercadoria,mercadorias.RequerComplemento,tamanho.* FROM precostamanho INNER JOIN mercadorias ON (mercadorias.Codigo = precostamanho.CodMerc) INNER JOIN tamanho ON (precostamanho.Tamanho = tamanho.Descricao)
				");
      $sql->execute();

      $array = $sql->rowCount() ? $sql->fetchAll(\PDO::FETCH_ASSOC) : [];

      echo json_encode($array);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }
}

$tamanhos = new Tamanhos;

$tamanhos->pegarTamanhos();

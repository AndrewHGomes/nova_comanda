<?php

require_once 'Conexao.php';

class Mercadorias extends Conexao
{
  public function __construct()
  {
    parent::__construct();
  }

  public function pegarMercadorias()
  {
    try {
      $sql = $this->pdo->prepare("SELECT mercadorias.Codigo as CodMerc, mercadorias.Descricao,mercadorias.borda, mercadorias.Venda,mercadorias.Complemento, mercadorias.Observacao,mercadorias.RequerComplemento,
      mercadorias.requerSabor, mercadorias.quantidadeSabor, mercadorias.sabor, mercadorias.grupo,
      mercadorias.RequerComplementoCod, mercadorias.Grupo, grupo.Descricao AS descgrupo,categorias.Descricao AS categoria, categorias.id as codcat FROM mercadorias INNER JOIN grupo ON (mercadorias.Grupo = grupo.Codigo) INNER JOIN categorias ON (grupo.idcategoria = categorias.id) WHERE mercadorias.Ativo = 'S' AND Comanda = 'S' GROUP BY mercadorias.Codigo ORDER BY mercadorias.Descricao ASC");

      $sql->execute();

      $array = $sql->rowCount() ? $sql->fetchAll(\PDO::FETCH_ASSOC) : [];

      echo json_encode($array);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }
}

$mercadorias = new Mercadorias;

$mercadorias->pegarMercadorias();

if (isset($_GET['tipoDePizza'])) {
  $tipoDePizza = $_GET['tipoDePizza'];
}

if (isset($_GET['nomecategoria'])) {
  $nomeCategoria = $_GET['nomecategoria'];
}

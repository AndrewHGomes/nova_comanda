<?php

require_once 'Conexao.php';

class Mercadorias extends Conexao
{
  public function pegarMercadorias()
  {
    try {
      $sql = $this->pdo->prepare("SELECT mercadorias.Codigo as CodMerc, mercadorias.Descricao,mercadorias.borda, mercadorias.Venda,mercadorias.Complemento, mercadorias.Observacao,mercadorias.RequerComplemento,
      mercadorias.requerSabor, mercadorias.quantidadeSabor, mercadorias.sabor, mercadorias.grupo,
      mercadorias.RequerComplementoCod, mercadorias.Grupo, grupo.Descricao AS descgrupo,categorias.Descricao AS categoria, categorias.id as codcat FROM mercadorias INNER JOIN grupo ON (mercadorias.Grupo = grupo.Codigo) INNER JOIN categorias ON (grupo.idcategoria = categorias.id) WHERE mercadorias.Ativo = 'S' AND Comanda = 'S' GROUP BY mercadorias.Codigo ORDER BY mercadorias.Descricao ASC");

      $sql->execute();

      $array = $sql->rowCount() ? $sql->fetchAll(\PDO::FETCH_ASSOC) : [];

      foreach ($array as $item) {
        $codMerc[] = $item['CodMerc'];
        $descricao[] = $item['Descricao'];
        $borda[] = $item['borda'];
        $venda[] = $item['Venda'];
        $complemento[] = $item['Complemento'];
        $observacao[] = $item['Observacao'];
        $requerComplemento[] = $item['RequerComplemento'];
        $requerSabor[] = $item['requerSabor'];
        $quantidadeSabor[] = $item['quantidadeSabor'];
        $sabor[] = $item['sabor'];
        $grupo[] = $item['grupo'];
      }

      $dados = [$codMerc, $descricao, $borda, $venda, $complemento, $observacao, $requerComplemento, $requerSabor, $quantidadeSabor, $sabor, $grupo];

      return json_encode($dados);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }

  public function pegarCategorias()
  {
    try {
      $sql = $this->pdo->prepare("SELECT categorias.id AS Codigo, categorias.descricao AS Descricao, categorias.Pizza FROM categorias WHERE categorias.ativo = 'S' GROUP BY categorias.OrdemComanda");

      $sql->execute();

      $array = $sql->rowCount() ? $sql->fetchAll(\PDO::FETCH_ASSOC) : [];

      return json_encode($array);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }

  public function requerSabores()
  {
    try {
      $sql = $this->pdo->prepare("SELECT mercadorias.Descricao as DescMerc,mercadorias.Observacao, sabores.*, 0 as quantidade FROM sabores INNER JOIN mercadorias ON (mercadorias.Codigo = sabores.idSabor)");

      $sql->execute();

      $array = $sql->rowCount() ? $sql->fetchAll(\PDO::FETCH_ASSOC) : [];

      foreach ($array as $item) {
        $id[] = $item['id'];
        $idMerc[] = $item['idMerc'];
        $idSabor[] = $item['idSabor'];
        $valor[] = $item['valor'];
      }

      return json_encode([
        $id,
        $idMerc,
        $idSabor,
        $valor
      ]);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }

  public function pegarComplementos()
  {
    try {
      $sql = $this->pdo->prepare("SELECT mercadorias.Codigo as CodMerc, mercadorias.Descricao, mercadorias.Venda, mercadorias.Complemento FROM mercadorias WHERE mercadorias.Ativo = 'S' AND Comanda = 'S' AND mercadorias.Complemento = 'S' GROUP BY mercadorias.Codigo ORDER BY mercadorias.Descricao ASC
			");

      $sql->execute();

      $array = $sql->rowCount() ? $sql->fetchAll(\PDO::FETCH_ASSOC) : [];

      foreach ($array as $item) {
        $codigo[] = $item['CodMerc'];
        $descricao[] = $item['Descricao'];
        $venda[] = $item['Venda'];
        $complemento[] = $item['Complemento'];
      }

      return json_encode([
        $codigo,
        $descricao,
        $venda,
        $complemento
      ]);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }

  public function pegarTamanhos()
  {
    try {
      $sql = $this->pdo->prepare("SELECT precostamanho.*,mercadorias.Codigo AS CodTbMercadoria,mercadorias.RequerComplemento,tamanho.* FROM precostamanho INNER JOIN mercadorias ON (mercadorias.Codigo = precostamanho.CodMerc) INNER JOIN tamanho ON (precostamanho.Tamanho = tamanho.Descricao)
				");
      $sql->execute();

      $array = $sql->rowCount() ? $sql->fetchAll(\PDO::FETCH_ASSOC) : [];

      return json_encode($array);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }

  public function pegarGrupoComplemento()
  {

    try {
      $sql = $this->pdo->prepare("SELECT * FROM grupocomp");

      $sql->execute();

      $array = $sql->rowCount() ? $sql->fetchAll(\PDO::FETCH_ASSOC) : [];

      foreach ($array as $item) {
        $id[] = $item['id'];
        $descricao[] = $item['Descricao'];
      }

      return json_encode([$id, $descricao]);
    } catch (PDOException $e) {

      echo $e->getMessage();
    }
  }
}

$mercadorias = new Mercadorias;
$mercadorias->pegarMercadorias();
$mercadorias->pegarCategorias();
$mercadorias->requerSabores();
$mercadorias->pegarComplementos();
$mercadorias->pegarTamanhos();
$mercadorias->pegarGrupoComplemento();

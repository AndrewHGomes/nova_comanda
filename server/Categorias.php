<?php

require_once "Conexao.php";

class Categorias extends Conexao
{
  public function pegarCategorias()
  {
    try {
      $sql = $this->pdo->prepare("SELECT categorias.id AS Codigo, categorias.descricao AS Descricao, categorias.Pizza FROM categorias WHERE categorias.ativo = 'S' ORDER BY OrdemComanda");

      $sql->execute();

      $array = $sql->rowCount() ? $sql->fetchAll(\PDO::FETCH_ASSOC) : [];

      echo json_encode($array);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }
}

$categorias = new Categorias;

$categorias->pegarCategorias();

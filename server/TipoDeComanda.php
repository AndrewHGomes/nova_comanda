<?php

require_once "Conexao.php";

class TipoDeComanda extends Conexao
{
  private $pdo;

  public function __construct()
  {
    $this->pdo = Conexao::conexaoUtf8();
  }

  public function tipoDeComanda()
  {
    try {
      $sql = $this->pdo->prepare("SELECT Valor FROM sis_parametro WHERE Nome = 'TipoDeComanda'");

      $sql->execute();

      $parametro = $sql->fetchAll(\PDO::FETCH_ASSOC)[0]['Valor'];

      if ($parametro === "P") {
        $sqlNomes = $this->pdo->prepare("SELECT * FROM comandacab");

        $sqlNomes->execute();

        $arrayNomes = $sqlNomes->rowCount() ? $sqlNomes->fetchAll(\PDO::FETCH_ASSOC) : [];

        echo json_encode([$parametro, $arrayNomes]);
      } elseif ($parametro === "M") {
        $sqlMesas = $this->pdo->prepare("SELECT NComandas FROM parametros");

        $sqlMesas->execute();

        $arrayMesas = $sqlMesas->rowCount() ? $sqlMesas->fetchAll(\PDO::FETCH_ASSOC)[0] : [];

        echo json_encode([$parametro, $arrayMesas]);
      }
    } catch (PDOException $e) {
      echo $e->getMessage();
    }
  }
}

$tipoDeComanda = new TipoDeComanda;

$tipoDeComanda->tipoDeComanda();

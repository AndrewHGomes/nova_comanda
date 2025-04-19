<?php

require_once 'Conexao.php';

class Controles extends Conexao
{
  public function tipoDeComanda()
  {
    try {
      $sql = $this->pdo->prepare("SELECT Valor FROM sis_parametro WHERE Nome = 'ComandaEntrada'");

      $sql->execute();

      $dados = $sql->fetchAll(\PDO::FETCH_ASSOC);

      $parametro = $dados[0]['Valor'];

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
      echo "<p>{$e->getMessage()}</p>";
    }
  }

  // public function ExigirNomeNaMesa()
  // {
  //   try {
  //     $sql = $this->pdo->prepare("SELECT * FROM sis_parametro WHERE Nome = 'ExigirNomeNaMesa'");

  //     $sql->execute();

  //     $dados = $sql->fetchAll(\PDO::FETCH_ASSOC);

  //     $parametro = $dados[0]['Valor'];

  //     return json_encode($parametro);
  //   } catch (PDOException $e) {
  //     echo "<p>{$e->getMessage()}</p>";
  //   }
  // }

  // public function mostrarTotalHistoricoComanda()
  // {
  //   try {
  //     $sql = $this->pdo->prepare("SELECT * FROM sis_parametro WHERE Nome = 'MostrarTotalHistoricoComanda'");

  //     $sql->execute();

  //     $dados = $sql->fetchAll(\PDO::FETCH_ASSOC);

  //     $parametro = $dados[0]['Valor'];

  //     return json_encode($parametro);
  //   } catch (PDOException $e) {
  //     echo "<p>{$e->getMessage()}</p>";
  //   }
  // }

  // public function obterParametroFracao()
  // {
  //   try {
  //     $sql = $this->pdo->prepare("SELECT valor FROM sis_parametro WHERE nome = 'CalculoFracao'");

  //     $sql->execute();

  //     return $sql->fetch(PDO::FETCH_ASSOC)['valor'];
  //   } catch (PDOException $e) {
  //     echo "<p>{$e->getMessage()}</p>";
  //   }
  // }
}

$controles = new Controles;

$controles->tipoDeComanda();


// $controles->ExigirNomeNaMesa();
// $controles->mostrarTotalHistoricoComanda();
// $controles->obterParametroFracao();

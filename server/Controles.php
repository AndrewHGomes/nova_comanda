<?php

require_once 'Conexao.php';

class Controles extends Conexao
{
  public function tipoDeComanda()
  {
    try {
      $sql = $this->pdo->prepare("SELECT * FROM sis_parametro WHERE Nome = 'ComandaEntrada'");

      $sql->execute();

      $dados = $sql->fetchAll(\PDO::FETCH_ASSOC);

      $parametro = $dados[0]['Valor'];

      if ($parametro === "P") {
        $sqlNome = $this->pdo->prepare("SELECT * FROM comandacab");

        $sqlNome->execute();

        $arrayNome = $sqlNome->rowCount() ? $sqlNome->fetchAll(\PDO::FETCH_ASSOC) : [];

        foreach ($arrayNome as $item) {
          $codigo[] = $item['Codigo'];
          $codigoComanda[] = $item['CodigoComanda'];
          $telefone[] = $item['Telefone'];
          $cliente[] = $item['Cliente'];
        }

        return json_encode([
          $parametro,
          $codigo,
          $codigoComanda,
          $telefone,
          $cliente
        ]);
      } elseif ($parametro === "M") {
        $sqlMesa = $this->pdo->prepare("SELECT NComandas FROM parametros");

        $sqlMesa->execute();

        $arrayMesa = $sqlMesa->rowCount() ? $sqlMesa->fetchAll(\PDO::FETCH_ASSOC)[0] : [];

        return json_encode([$parametro, $arrayMesa]);
      }
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }

  public function ExigirNomeNaMesa()
  {
    try {
      $sql = $this->pdo->prepare("SELECT * FROM sis_parametro WHERE Nome = 'ExigirNomeNaMesa'");

      $sql->execute();

      $dados = $sql->fetchAll(\PDO::FETCH_ASSOC);

      $parametro = $dados[0]['Valor'];

      return json_encode($parametro);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }

  public function mostrarTotalHistoricoComanda()
  {
    try {
      $sql = $this->pdo->prepare("SELECT * FROM sis_parametro WHERE Nome = 'MostrarTotalHistoricoComanda'");

      $sql->execute();

      $dados = $sql->fetchAll(\PDO::FETCH_ASSOC);

      $parametro = $dados[0]['Valor'];

      return json_encode($parametro);
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }

  public function obterParametroFracao()
  {
    try {
      $sql = $this->pdo->prepare("SELECT valor FROM sis_parametro WHERE nome = 'CalculoFracao'");

      $sql->execute();

      return $sql->fetch(PDO::FETCH_ASSOC)['valor'];
    } catch (PDOException $e) {
      echo "<p>{$e->getMessage()}</p>";
    }
  }
}

$controles = new Controles;
// $controles->tipoDeComanda();
$controles->ExigirNomeNaMesa();
$controles->mostrarTotalHistoricoComanda();
$controles->obterParametroFracao();

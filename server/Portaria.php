<?php

require_once 'Conexao.php';

class Portaria extends Conexao
{
  public $pdo;

  public function __construct()
  {
    $this->pdo = Conexao::conexaoUtf8();
  }

  public function pegarIntervaloComandas()
  {
    try {
      $sql = $this->pdo->prepare("SELECT Valor FROM sis_parametro WHERE Nome = 'IntervaloComandas'");

      $sql->execute();

      $intervalo = $sql->fetchAll(\PDO::FETCH_ASSOC)[0];

      print_r(json_encode($intervalo));
    } catch (PDOException $e) {
      echo $e->getMessage();
    }
  }

  public function dadosComandaCab()
  {
    try {
      $jsonDados = file_get_contents('php://input');
      $dados = json_decode($jsonDados, true);

      if ($dados === null && json_last_error() !== JSON_ERROR_NONE) {
        echo "Erro ao decodificar os dados JSON recebidos.";
        return;
      }

      if (!isset($dados['CodigoComanda']) || !isset($dados['Telefone']) || !isset($dados['Cliente'])) {
        echo "Dados incompletos recebidos.";
        return;
      }

      $sql = $this->pdo->prepare("INSERT INTO comandacab (CodigoComanda, Telefone, Cliente) VALUES (:codigo, :telefone, :cliente)");

      $sql->bindParam(':codigo', $dados['CodigoComanda']);
      $sql->bindParam(':telefone', $dados['Telefone']);
      $sql->bindParam(':cliente', $dados['Cliente']);

      if ($sql->execute()) {
        echo "SUCESSO!";
      } else {
        echo "ERRO!";
        error_log("Erro na inserção da comanda: " . print_r($sql->errorInfo(), true));
      }
    } catch (PDOException $e) {
      echo $e->getMessage();
    }
  }
}

$tipoPoratria = new Portaria;

if (isset($_GET['pegarIntervaloComandas'])) {
  $tipoPoratria->pegarIntervaloComandas();
}

if (isset($_GET['dadosComandaCab'])) {
  $tipoPoratria->dadosComandaCab();
}

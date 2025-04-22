<?php

require 'Conexao.php';

class QuantidadeClientes extends Conexao
{
  public function __construct()
  {
    parent::__construct();
  }

  public function inserirClientes($quantidade, $mesa)
  {
    $stmt = $this->pdo->prepare("INSERT INTO comandacab (QtdPessoas, CodigoComanda) VALUES (:quantidade, :mesa)");
    $stmt->bindParam(':quantidade', $quantidade);
    $stmt->bindParam(':mesa', $mesa);

    if ($stmt->execute()) {
      echo json_encode(['Sucesso:' => 'Dados inseridos com sucesso!']);
    } else {
      echo json_encode(['Erro:' => 'Erro ao inserir dados.']);
    }
  }

  public function atualizarClientes($quantidade, $mesa)
  {
    $stmt = $this->pdo->prepare("SELECT * FROM comandacab WHERE CodigoComanda = :mesa");
    $stmt->bindParam(':mesa', $mesa);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
      $stmt = $this->pdo->prepare("UPDATE comandacab SET QtdPessoas = :quantidade WHERE CodigoComanda = :mesa");
    }

    $stmt->bindParam(':quantidade', $quantidade);
    $stmt->bindParam(':mesa', $mesa);

    if ($stmt->execute()) {
      echo json_encode(['Sucesso:' => 'Dados atualizados com sucesso!']);
    } else {
      echo json_encode(['Erro:' => 'Erro ao atualizar dados.']);
    }
  }

  public function salvarClientes($quantidade, $mesa)
  {
    $stmt = $this->pdo->prepare("SELECT * FROM comandacab WHERE CodigoComanda = :mesa");
    $stmt->bindParam(':mesa', $mesa);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
      $this->atualizarClientes($quantidade, $mesa);
    } else {
      $this->inserirClientes($quantidade, $mesa);
    }
  }

  public function pegarQuantidadeClientes($mesa)
  {
    $stmt = $this->pdo->prepare("SELECT QtdPessoas FROM comandacab WHERE CodigoComanda = :mesa");
    $stmt->bindParam(':mesa', $mesa);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
      $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
      echo json_encode(['quantidade' => $resultado['QtdPessoas']]);
    } else {
      echo json_encode(['Erro' => 'Mesa não encontrada.']);
    }
  }
}

$quantidadeClientes = new QuantidadeClientes();

// header('Content-Type: application/json');
// $dados = json_decode(file_get_contents("php://input"));

// if (isset($dados->quantidade) && isset($dados->mesa)) {
//   $quantidadeClientes->salvarClientes($dados->quantidade, $dados->mesa);
// } elseif (isset($dados->mesa)) {
//   $quantidadeClientes->pegarQuantidadeClientes($dados->mesa);
// } else {
//   echo json_encode(['Erro' => 'Quantidade ou mesa não recebida.']);
//   exit;
// }

$quantidadeClientes->pegarQuantidadeClientes('');

<?php

require_once "Conexao.php";

class Login extends Conexao
{
  public $pdo;

  public function __construct()
  {
    $this->pdo = Conexao::conexaoLatin1();
  }

  public function pegarUsuarios()
  {
    try {
      $sql = $this->pdo->prepare("SELECT funcionarios.Codigo, funcionarios.Nome, funcionarios.Senha, permissoes.utilizarSicomanda20 AS permitido FROM funcionarios INNER JOIN permissoes ON (permissoes.idFuncionario = funcionarios.Codigo) WHERE funcionarios.ativo = 'Y'");
      $sql->execute();

      $array = $sql->rowCount() ? $sql->fetchAll(\PDO::FETCH_ASSOC) : [];

      $retornos = [];

      foreach ($array as $dados) {
        $nome = '';
        for ($i = 0; $i <= strlen($dados['Nome']) - 1; $i++) {
          $nome .= chr(~(ord($dados['Nome'][$i]) - 10));
        }

        $senha = '';
        for ($i = 0; $i <= strlen($dados['Senha']) - 1; $i++) {
          $senha .= chr(~(ord($dados['Senha'][$i]) - 10));
        }

        $retornos[] = [
          'Nome' => strtoupper($nome),
          'Senha' => strtoupper($senha),
          'Codigo' => $dados['Codigo'],
          'Permitido' => $dados['permitido']
        ];

        $nome = '';
        $senha = '';
      }

      echo json_encode($retornos);
    } catch (PDOException $e) {
      echo $e->getMessage();
    }
  }
}

$login = new Login;

if (isset($_GET['pegarUsuarios'])) {
  $login->pegarUsuarios();
}

<?php

header("Content-Type: application/json");

require_once "Conexao.php";

class Login extends Conexao
{
  public function __construct()
  {
    parent::__construct();
  }

  public function pegarUsuarios()
  {
    try {
      $sql = $this->pdo->prepare("SELECT funcionarios.Codigo, funcionarios.Nome, funcionarios.Senha, permissoes.utilizarSicomanda20 AS permitido FROM funcionarios INNER JOIN permissoes ON (permissoes.idFuncionario = funcionarios.Codigo) WHERE funcionarios.ativo = 'Y'");
      $sql->execute();
      $array = $sql->fetchAll(\PDO::FETCH_ASSOC);

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
      }

      print_r(json_encode($retornos));
    } catch (PDOException $e) {
      echo $e->getMessage();
    }
  }
}

$login = new Login;
$login->pegarUsuarios();

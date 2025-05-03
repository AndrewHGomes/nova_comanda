<?php

header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");
header("Content-Type: application/json");

class Conexao
{
  public $pdo;

  public function __construct()
  {
    date_default_timezone_set("America/Fortaleza");
    $this->conectar();
  }

  public function conectar()
  {
    try {
      $this->pdo = new PDO("mysql:host=127.0.0.1;dbname=sicomercio_fornalha;charset=latin1", "root", "");
      $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
      echo $e->getMessage();
    }
  }
}



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
      $nomeDescriptografado = "";
      $senhaDescriptografado = "";

      foreach ($array as $dados) {
        for ($i = 0; $i <= strlen($dados['Nome']) - 1; $i++) {
          $nomeDescriptografado .= chr(~(ord($dados['Nome'][$i]) - 10));
        }

        for ($i = 0; $i <= strlen($dados['Senha']) - 1; $i++) {
          $senhaDescriptografado .= chr(~(ord($dados['Senha'][$i]) - 10));
        }

        $retornos[] = [
          'Nome' => strtoupper($nomeDescriptografado),
          'Senha' => strtoupper($senhaDescriptografado),
          'Codigo' => $dados['Codigo'],
          'Permitido' => $dados['permitido']
        ];

        $nomeDescriptografado = '';
        $senhaDescriptografado = '';
      }

      print_r(json_encode($retornos));
    } catch (PDOException $e) {
      echo $e->getMessage();
    }
  }
}

$login = new Login;
$login->pegarUsuarios();

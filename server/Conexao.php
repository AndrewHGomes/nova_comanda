<?php

header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");
header("Content-Type: application/json");

class Conexao
{
  public static $pdo_utf8 = null;
  public static $pdo_latin1 = null;

  private static $host = "192.168.1.11";
  private static $dbname = "sicomercio_trentinnovo";
  private static $user = "root";
  private static $password = "";

  public function __construct()
  {
    date_default_timezone_set("America/Fortaleza");
  }

  public static function conexaoUtf8()
  {
    if (self::$pdo_utf8 === null) {
      try {
        self::$pdo_utf8 = new PDO("mysql:host=" . self::$host . ";dbname=" . self::$dbname . ";charset=utf8", self::$user, self::$password);
        self::$pdo_utf8->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        self::$pdo_utf8->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
      } catch (PDOException $e) {
        echo "Erro na conexão UTF-8: " . $e->getMessage();
      }
    }
    return self::$pdo_utf8;
  }

  public static function conexaoLatin1()
  {
    if (self::$pdo_latin1 === null) {
      try {
        self::$pdo_latin1 = new PDO("mysql:host=" . self::$host . ";dbname=" . self::$dbname . ";charset=latin1", "" . self::$user . ", " . self::$password);
        self::$pdo_latin1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        self::$pdo_latin1->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
      } catch (PDOException $e) {
        echo "Erro na conexão Latin-1: " . $e->getMessage();
      }
    }
    return self::$pdo_latin1;
  }
}

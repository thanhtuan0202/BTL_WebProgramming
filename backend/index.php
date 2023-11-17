<?php
include_once("./controllers/Controller.php");

error_reporting(0);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$parsed = parse_url($_SERVER['REQUEST_URI']);
$method = $_SERVER['REQUEST_METHOD']; 

$controller = new Controller();
$controller->invoke($method, $parsed);
?>
<?php
include_once("models/VariantShoeModel.php");
class VariantController
{
    public $model;
    public function __construct()
    {
        $this->model = new VariantShoeModel();
    }
    public function invoke($method, $parsed, $path, $token)
    {
        if ($method == "GET") {
            if (isset($path[4])) {
                $res = $this->model->getVariantShoe($path[4]);
                $data = array(
                    'data' => array('shoe_id'=> (int)$path[4],'variants' => $res)
                );
                http_response_code(200);
                header('Content-Type: application/json');
                echo json_encode($data);
            }
        } 
        else if ($method == "POST") {
            if ($token == null) {
                $data = array(
                  'data' => array('error' => "Unauthorized")
                );
                http_response_code(401);
                header('Content-Type: application/json');
                $json = json_encode($data);
                echo $json;
            }
            else{
                include_once("utils/jwt.php");
                $payload = decode_jwt($token)["payload"];
                if ($payload["role"] != "admin") {
                  $data = array(
                    'data' => array('error' => "Forbidden")
                  );
                  http_response_code(403);
                  header('Content-Type: application/json');
                  $json = json_encode($data);
                  echo $json;
                } 
                else{
                    if (isset($path[4])) {
                        $input = (array) json_decode(file_get_contents('php://input'), true);
                        $res = $this->model->addNewVariantForProduct($path[4],$input);
                        $data = array(
                            'data' => $res
                        );
                        http_response_code(200);
                        header('Content-Type: application/json');
                        echo json_encode($data);
                    }
                }
            }
        } else if ($method == "PUT") {
        } else if ($method == "PATCH") {
            if ($token == null) {
                $data = array(
                  'data' => array('error' => "Unauthorized")
                );
                http_response_code(401);
                header('Content-Type: application/json');
                $json = json_encode($data);
                echo $json;
            }
            else{
                include_once("utils/jwt.php");
                $payload = decode_jwt($token)["payload"];
                if ($payload["role"] != "admin") {
                  $data = array(
                    'data' => array('error' => "Forbidden")
                  );
                  http_response_code(403);
                  header('Content-Type: application/json');
                  $json = json_encode($data);
                  echo $json;
                } 
                else{
                    if (isset($path[4])) {
                        $input = (array) json_decode(file_get_contents('php://input'), true);
                        $res = $this->model->changeIn_Stock($path[4],$input["stock_value"]);
                        $data = array(
                            'data' => $res
                        );
                        http_response_code(200);
                        header('Content-Type: application/json');
                        echo json_encode($data);
                    }
                }
            } 
            
        }
    }
}

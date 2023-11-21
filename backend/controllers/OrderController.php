<?php
include_once("models/OrderModel.php");

class OrderController
{
    private $model;

    public function __construct()
    {
        $this->model = new OrderModel();
    }

    public function invoke($method, $parsed, $path,$token = null)
    {
        if (!isset($path[4])) {
            if($method == "GET"){
                $query_lst = [];
                parse_str($parsed['query'], $query_lst);
                if (!isset($query_lst["page"])) {
                    $page = 1;
                } else {
                    $page = $query_lst["page"];
                }
    
                if (!isset($query_lst["status"])) {
                    $status = null;
                } else {
                    $status = $query_lst["status"];
                }
                $res = $this->model->getAllOrders($page, $status);
                $data = array(
                    'data' => array('shoe' => $res)
                );
                http_response_code(200);
                header('Content-Type: application/json');
                echo json_encode($data);
            }
            else if ($method == "POST") {
                $input = (array) json_decode(file_get_contents('php://input'), true);
                include_once("utils/jwt.php");
                $payload = decode_jwt($token)["payload"];
                $res = $this->model->addNewOrder($payload["user_id"],$input["address"],$input["phone_number"]);
                $data = array(
                    'data' => array('shoe' => $res)
                );
                http_response_code(200);
                header('Content-Type: application/json');
                echo json_encode($data);
            }

        } else if (!isset($path[5])) {
            
        }
    }
}

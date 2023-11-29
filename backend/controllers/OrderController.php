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

                    if($payload["role"] == "admin"){
                        $res = $this->model->getAllOrders($page, $status);
                        $data = array(
                            'data' => $res
                        );
                    }
                    else{
                        $res = $this->model->getOrdersByUserId($payload["user_id"], $page);
                        $data = array(
                            'data' => array('order' => $res)
                        );
                    }


                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($data);
                }
                else if ($method == "POST") {
                    $input = (array) json_decode(file_get_contents('php://input'), true);
                    $res = $this->model->addNewOrder($payload["user_id"],$input["address"],$input["phone_number"],$input["payment_method"]);
                    $data = array(
                        'data' => $res
                    );
                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($data);
                }
    
            } else if (!isset($path[5])) {
                if($payload["role"] == "admin"){
                    $res = $this->model->detailOrderAdmin($path[4]);
                }
                else{
                    $res = $this->model->getDetailOrder($path[4], $payload["user_id"]);
                }
                $data = array(
                    'data' => array('order' => $res)
                );
                http_response_code(200);
                header('Content-Type: application/json');
                echo json_encode($data);
            }
        }
    }
}

<?php
include_once('models/CartModel.php');
class CartController
{
    public $model;
    public function __construct()
    {
        $this->model = new CartModel();
    }
    protected function pahtNotFound()
    {
        $data = array(
            'statusCode' => '404',
            'data' => array('error' => 'Path Not Found')
        );
        http_response_code(404);
        header('Content-Type: application/json');
        $json = json_encode($data);
        return $json;
    }
    public function invoke($method, $parsed, $path)
    {
        if (isset($path[4])) {
            if (!isNumberID($path[4])) {
                $res = ["msg" => "Must is number", "error-field" => "user id"];
                http_response_code(400);
                header('Content-Type: application/json');
                $data = array(
                    'data' => array('error' => $res)
                );
                $json = json_encode($data);
                echo $json;
            } else {
                if ($method == "GET") {
                    $res = $this->model->getCartItems($path[4]);
                    if ($res == null) {
                        $data = array(
                            'data' => array('carts' => [])
                        );
                    } else {
                        $data = array(
                            'data' => array('carts' => $res)
                        );
                    }
                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($data);
                } else if ($method == "POST") {
                    $input = (array) json_decode(file_get_contents('php://input'), true);
                    $res = $this->model->addNewItemToCart($path[4],$input["vp_id"],$input["quantity"],$input["pid"]);
                    $data = array(
                        'data' => $res
                    );
                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($data);
                } else if ($method == "DELETE") {
                    $input = (array) json_decode(file_get_contents('php://input'), true);
                    $res = $this->model->removeItemInCart($path[4],$input["vp_id"]);
                    $data = array(
                        'data' => $res
                    );
                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($data); 
                }
            }
        } else {
            echo $this->pahtNotFound();
        }
    }
}

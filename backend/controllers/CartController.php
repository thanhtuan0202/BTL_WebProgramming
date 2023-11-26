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
    public function invoke($method, $parsed, $path,$token = null)
    {
        if (!isset($path[4])) {
            if($token == null){
                $data = "FORBIDDEN";
                http_response_code(403);
                header('Content-Type: application/json');
                echo json_encode($data);
            }
            else{
                include_once("utils/jwt.php");
                $payload = decode_jwt($token)['payload'];
                if ($method == "GET") {
                    $res = $this->model->getCartItems($payload["user_id"]);
                    if ($res == null) {
                        $data = array(
                            'data' => array('carts' => [])
                        );
                    } else {
                        $data = array(
                            'data' => $res
                        );
                    }
                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($data);
                } else if ($method == "POST") {
                    $input = (array) json_decode(file_get_contents('php://input'), true);
                    $res = $this->model->addNewItemToCart($payload["user_id"],$input["vp_id"],$input["quantity"],$input["pid"]);
                    $data = array(
                        'data' => $res
                    );
                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode($data);
                } else if ($method == "DELETE") {
                    $input = (array) json_decode(file_get_contents('php://input'), true);
                    $res = $this->model->removeItemInCart($payload["user_id"],$input["vp_id"]);
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

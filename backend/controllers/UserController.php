<?php
include_once("models/Model.php");
class UserController
{
    public $model;
    public function __construct()
    {
        $this->model = new Model();
    }
    public function pahtNotFound()
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
            include_once("utils/utils.php");
            if (!isNumberID($path[4])) {
                $data = array(
                    'data' => array('error' => 'Invalid number id')
                );
                http_response_code(400);
                header('Content-Type: application/json');
                $json = json_encode($data);
                echo $json;
            } else {
                if ($method == "GET") {
                    $res = $this->model->getUserDetail($path[4]);
                    if ($res == null) {
                        $data = array(
                            'data' => array('error' => 'Tài khoản không tồn tại!')
                        );
                        http_response_code(200);
                        header('Content-Type: application/json');
                        $json = json_encode($data);
                        echo $json;
                    } else {
                        $data = array(
                            'data' => $res
                        );
                        http_response_code(200);
                        header('Content-Type: application/json');
                        $json = json_encode($data);
                        echo $json;
                    }
                } else if ($method == "PUT") {
                    $input = (array) json_decode(file_get_contents('php://input'), true);
                    
                } else if ($method == "PATCH") {
                    $input = (array) json_decode(file_get_contents('php://input'), true);
                    $res = $this->model->changeUserPassword($input['current_pass'], $input['new_pass'], $input['confirm_pass'], $path[4]);
                    if ($res == null) {
                        $data = array(
                            'data' => array('error' => 'Tài khoản không tồn tại!')
                        );
                        http_response_code(200);
                        header('Content-Type: application/json');
                        $json = json_encode($data);
                        echo $json;
                    } else {
                        $data = array(
                            'data' => $res
                        );
                        http_response_code(200);
                        header('Content-Type: application/json');
                        $json = json_encode($data);
                        echo $json;
                    }
                }
            }
        } else {
        }
    }
}

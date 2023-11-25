<?php
include_once("models/Model.php");
class UserController
{
    public $model;
    public function __construct()
    {
        $this->model = new Model();
    }
    protected function validate($input)
    {
        $error_lst = [];
        $gender = $input['gender'];
        if ($gender != "M" && $gender != "F") {
            $res = ["msg" => "Invalid gender", "error-field" => "gender"];
            array_push($error_lst, $res);
        }
        include_once("utils/utils.php");
        // if (!isset($input['address'])) {
        //     $res = ["msg" => "Not empty", "error-field" => "address"];
        //     array_push($error_lst, $res);
        // }
        if (!isset($input['fullname'])) {
            $res = ["msg" => "Not empty", "error-field" => "fullname"];
            array_push($error_lst, $res);
        }
        if (!isValidPhoneNumber($input['phone']) || !isset($input['phone'])) {
            $res = ["msg" => "Invalid phone number", "error-field" => "phone"];
            array_push($error_lst, $res);
        }
        if (!isValidDate($input['dob']) || !isset($input['dob'])) {
            $res = ["msg" => "Date must is format YYYY-MM-DD", "error-field" => "dob"];
            array_push($error_lst, $res);
        }
        if (!isValidEmail($input['email']) || !isset($input['email'])) {
            $res = ["msg" => "Email is not a valid format", "error-field" => "email"];
            array_push($error_lst, $res);
        }
        return $error_lst;
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
            if ($token == null) {
                $data = "FORBIDDEN";
                http_response_code(403);
                header('Content-Type: application/json');
                echo json_encode($data);
            } else {
                include_once("utils/jwt.php");
                $payload = decode_jwt($token)['payload'];
                if ($method == "GET") {
                    $res = $this->model->getUserDetail($payload["user_id"]);
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
                            'data' => array("user_info" => $res)
                        );
                        http_response_code(200);
                        header('Content-Type: application/json');
                        $json = json_encode($data);
                        echo $json;
                    }
                } else if ($method == "PUT") {
                    $input = (array) json_decode(file_get_contents('php://input'), true);
                    $error_lst = $this->validate($input);
                    if (count($error_lst) > 0) {
                        http_response_code(400);
                        header('Content-Type: application/json');
                        $data = array(
                            'data' => array('error' => $error_lst)
                        );
                        $json = json_encode($data);
                        echo $json;
                    } else {
                        $res = $this->model->changeUserInfo($payload["user_id"], $input['fullname'], $input['email'], $input['address'], $input['dob'], $input['phone'], $input['gender']);
                        $data = array(
                            'data' => $res
                        );
                        http_response_code(200);
                        header('Content-Type: application/json');
                        $json = json_encode($data);
                        echo $json;
                    }
                } else if ($method == "PATCH") {
                    $input = (array) json_decode(file_get_contents('php://input'), true);
                    $res = $this->model->changeUserPassword($input['current_pass'], $input['new_pass'], $input['confirm_pass'], $payload["user_id"]);
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
                } else {
                    $data = array(
                        'data' => array('error' => 'Method Not Found')
                    );
                    http_response_code(404);
                    header('Content-Type: application/json');
                    $json = json_encode($data);
                    echo $json;
                }
            }
        } else {
            echo $this->pahtNotFound();
        }
    }
}

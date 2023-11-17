<?php
include_once("models/Model.php");
class AuthController
{
  public $model;
  public function __construct()
  {
    $this->model = new Model();
  }

  public function invoke($method, $parsed, $pathElements)
  {
    if (sizeof($pathElements) > 5 || isset($parsed['query'])) {
      $data = array(
        'statusCode' => '404',
        'data' => array('error' => 'Path Not Found')
      );
      http_response_code(404);
      header('Content-Type: application/json');
      $json = json_encode($data);
      echo $json;
    } else {
      if (isset($pathElements[4])) {
        if ($pathElements[4] === 'login') {
          if ($method == "POST") {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $res = $this->model->login($input['username'], $input['password']);
            if ($res == null) {
              //if login failed
              $data = array(
                'data' => array('error' => 'Tài khoản hoặc mật khẩu không chính xác!')
              );
              http_response_code(200);
              header('Content-Type: application/json');
              $json = json_encode($data);
              echo $json;
            } else {
              //login successfull
              http_response_code(200);
              header('Content-Type: application/json');
              $data = array(
                'data' => $res
              );
              $json = json_encode($data);
              echo $json;
            }
          } else {
            //method not found
            $data = array(
              'data' => array('error' => 'Method Not Found')
            );
            http_response_code(404);
            header('Content-Type: application/json');
            $json = json_encode($data);
            echo $json;
          }
        } else if ($pathElements[4] === 'register') {

          if ($method == "POST") {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            $error_lst = [];
            //validate input
            $is_fail = false;
            $gender = $input['gender'];
            if ($gender == "male") {
              $gender = "M";
            } else if ($gender == "female") {
              $gender = "F";
            } else {
              $res = ["msg" => "Invalid gender", "error-field" => "gender"];
              $is_fail = true;
              array_push($error_lst, $res);
            }
            include_once("utils/utils.php");

            if (!isValidPhoneNumber($input['phone'])) {
              $res = ["msg" => "Invalid phone number", "error-field" => "phone"];
              $is_fail = true;
              array_push($error_lst, $res);
            }
            if (!isValidDate($input['dob'])) {
              $res = ["msg" => "Date must is format YYYY-MM-DD", "error-field" => "dob"];
              $is_fail = true;
              array_push($error_lst, $res);
            }
            //handle response
            if (!$is_fail) {
              $res = $this->model->register($input['username'], $input['password'], $input['fullname'], $input['phone'], $input['dob'], $gender);
              http_response_code(200);
              header('Content-Type: application/json');
              $data = array(
                'data' => $res
              );
              $json = json_encode($data);
              echo $json;
            }
            else{
              http_response_code(400);
              header('Content-Type: application/json');
              $data = array(
                'error' => $error_lst
              );
              $json = json_encode($data);
              echo $json;
            }
          } else {
            //method not found
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
        //path not found
        $data = array(
          'data' => array('error' => 'Path Not Found')
        );
        http_response_code(404);
        header('Content-Type: application/json');
        $json = json_encode($data);
        echo $json;
      }
    }
  }
}

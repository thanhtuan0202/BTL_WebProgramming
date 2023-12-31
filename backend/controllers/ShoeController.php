<?php
include_once('models/Model.php');
class ShoeController
{
  public $model;
  public function __construct()
  {
    $this->model = new Model();
  }
  public function invoke($method, $parsed, $path, $token = null)
  {
    if ($method == 'GET') {

      if (!isset($path[4])) {
        
        //get for shoes?page=0&limit=10&sortby=price
        $query_lst = [];
        $error_lst = [];
        parse_str($parsed['query'], $query_lst);
        if (!isset($query_lst['page'])) {
          $page = 0;
        } else {
          if (is_numeric($query_lst['page'])) {
            $page = intval($query_lst['page']);
          } else {
            $res = ["msg" => "Must is number", "error-field" => "page field"];
            array_push($error_lst, $res);
          }
        }
        if (!isset($query_lst['limit'])) {
          $limit = 10;
        } else {
          if (is_numeric($query_lst['limit'])) {
            $limit = intval($query_lst['limit']);
          } else {
            $res = ["msg" => "Must is number", "error-field" => "limit field"];
            array_push($error_lst, $res);
          }
        }

        if (!isset($query_lst['sortby'])) {
          $sortby = "create_at";
        } else {
          $sortby = $query_lst['sortby'];
          if ($sortby != "time" && $sortby != "price") {
            $res = ["msg" => "Error ", "error-field" => "sortby"];
            array_push($error_lst, $res);
          }
        }

        if (!isset($query_lst['type'])) {
          $type = "desc";
        } else {
          $type = $query_lst['type'];
          if ($type !== 'desc' && $type !== 'asc') {
            $res = ["msg" => "Error ", "error-field" => "type"];
            array_push($error_lst, $res);
          }
        }
        if (count($error_lst) > 0) {
          //error input value
          http_response_code(400);
          header('Content-Type: application/json');
          $data = array(
            'data' => array('error' => $error_lst)
          );
          $json = json_encode($data);
          echo $json;
        } else {
          //query in model
          if ($token != null) {
            include_once('utils/jwt.php');
            $payload = decode_jwt($token)["payload"];
            if($payload["role"] == "admin"){
              $res = $this->model->getAllShoeAdmin($page, $limit, $sortby, $type);
              $data = array(
                'data' => $res
              );
            }
          } 
          else {
            $res = $this->model->getAllShoe($page, $limit, $sortby, $type);
            $data = array(
              'data' => array('shoes' => $res)
            );
          }
          http_response_code(200);
          header('Content-Type: application/json');
          echo json_encode($data);
        }
      } else if (!isset($path[5])) {
        //get for shoes/shoe_id 
        if ($path[4] == "search") {
          $query_lst = [];
          parse_str($parsed['query'], $query_lst);
          //var_dump($query_lst);
          $res = $this->model->searchShoeByName($query_lst["q"]);
          $data = array(
            'data' => array('shoes' => $res)
          );
          http_response_code(200);
          header('Content-Type: application/json');
          echo json_encode($data);
        } else {
          $res = $this->model->getShoeById($path[4]);
          include_once("models/VariantShoeModel.php");
          $variant = new VariantShoeModel();
          $variant_item = $variant->getVariantShoe($path[4]);
          $data = array(
            'data' => array('shoes' => $res, 'variant' => $variant_item)
          );
          http_response_code(200);
          header('Content-Type: application/json');
          echo json_encode($data);
        }
      } else if (!isset($path[6])) {
        //get for shoes/category/category_id
        
        $query_lst = [];
        $error_lst = [];
        parse_str($path['query'], $query_lst);
        if (!isset($query_lst['page'])) {
          $page = 0;
        } else {
          if (is_numeric($query_lst['page'])) {
            $page = intval($query_lst['page']);
          } else {
            $res = ["msg" => "Must is number", "error-field" => "page field"];
            array_push($error_lst, $res);
          }
        }

        if (!isset($query_lst['limit'])) {
          $limit = 10;
        } else {
          if (is_numeric($query_lst['limit'])) {
            $limit = intval($query_lst['limit']);
          } else {
            $res = ["msg" => "Must is number", "error-field" => "limit field"];
            array_push($error_lst, $res);
          }
        }

        if (!isset($query_lst['sortby'])) {
          $sortby = 'price';
        } else {
          $sortby = $query_lst['sortby'];
          if ($sortby !== 'time' && $sortby !== 'price') {
            $res = ["msg" => "Error ", "error-field" => "sortby"];
            array_push($error_lst, $res);
          }
        }

        if (!isset($query_lst['type'])) {
          $type = 'desc';
        } else {
          $type = $query_lst['type'];
          if ($type !== 'desc' && $type !== 'asc') {
            $res = ["msg" => "Error ", "error-field" => "type"];
            array_push($error_lst, $res);
          }
        }
        if (!is_numeric($path[5])) {
          $res = ["msg" => "Must is number", "error-field" => "category id"];
          array_push($error_lst, $res);
        }

        if (count($error_lst) > 0) {
          http_response_code(400);
          header('Content-Type: application/json');
          $data = array(
            'data' => array('error' => $error_lst)
          );
          $json = json_encode($data);
          echo $json;
          //error input value
        } else {
          //query in model
          
          $res = $this->model->getShoeByCategory($path[5], $page, $limit, $sortby, $type);
          if ($res == null) {
            echo $res;
          } else {
            $data = array(
              'data' => array('shoes' => $res)
            );
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($data);
          }
        }
      }
    } else if ($method == "POST") {
      if ($token == null) {
        $data = array(
          'data' => array('error' => "Unauthorized")
        );
        http_response_code(401);
        header('Content-Type: application/json');
        $json = json_encode($data);
        echo $json;
      } else {
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
        } else {
          $input = (array) json_decode(file_get_contents('php://input'), true);
          if (!array_key_exists("image", $input)) {
            $input["image"] = "";
          }
          $res = $this->model->addNewShoe($input['name'], $input["category_id"], $input["price"], $input["description"], $input["image"], $input["variant"]);
          $data = array(
            'data' => $res
          );
          http_response_code(200);
          header('Content-Type: application/json');
          echo json_encode($data);
        }
      }
    } else if ($method == "PUT") {
      if (isset($path[4])) {
        $shoe_id = $path[4];
        if ($token == null) {
          $data = array(
            'data' => array('error' => "Unauthorized")
          );
          http_response_code(401);
          header('Content-Type: application/json');
          $json = json_encode($data);
          echo $json;
        } else {
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
          } else {
            $input = (array) json_decode(file_get_contents('php://input'), true);
            if (!array_key_exists("image", $input)) {
              $input["image"] = "";
            }
            $res = $this->model->changeShoeDetail($shoe_id, $input["price"], $input["description"], $input["image"], $input["variants"]);
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

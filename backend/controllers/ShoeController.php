<?php
include_once('models/Model.php');
class ShoeController
{
  public $model;
  public function __construct()
  {
    $this->model = new Model();
  }
  public function invoke($method, $parsed, $path)
  {
    if ($method == 'GET') {
      include_once('utils/utils.php');
      if (!isset($path[4])) {
        //get for shoes?page=0&limit=10&sortby=price
        $query_lst = [];
        $error_lst = [];
        parse_str($parsed['query'], $query_lst);
        if (!isset($query_lst['page'])) {
          $page = 0;
        } else {
          if (isNumberID($query_lst['page'])) {
            $page = intval($query_lst['page']);
          } else {
            $res = ["msg" => "Must is number", "error-field" => "page field"];
            array_push($error_lst, $res);
          }
        }

        if (!isset($query_lst['limit'])) {
          $limit = 10;
        } else {
          if (isNumberID($query_lst['limit'])) {
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
          $res = $this->model->getAllShoe($page, $limit, $sortby, $type);
          $data = array(
            'data' => array('shoes' => $res)
          );
          http_response_code(200);
          header('Content-Type: application/json');
          echo json_encode($data);
        }

      } else if (!isset($path[5])) {
        //get for shoes/shoe_id 

        $res = $this->model->getShoeById($path[4]);
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

      } else if (!isset($path[6])) {
        //get for shoes/category/category_id

        $query_lst = [];
        $error_lst = [];
        parse_str($path['query'], $query_lst);
        if (!isset($query_lst['page'])) {
          $page = 0;
        } else {
          if (isNumberID($query_lst['page'])) {
            $page = intval($query_lst['page']);
          } else {
            $res = ["msg" => "Must is number", "error-field" => "page field"];
            array_push($error_lst, $res);
          }
        }

        if (!isset($query_lst['limit'])) {
          $limit = 10;
        } else {
          if (isNumberID($query_lst['limit'])) {
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

        if (!isNumberID($path[5])) {
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
    }
  }
}

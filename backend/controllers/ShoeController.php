<?php
    include_once('models/Model.php');
  class ShoeController {
    public $model;
    public function __construct()
    {
      $this->model = new Model();
    }
    public function invoke($method,$parsed,$path){
      if($method == 'GET'){
        include_once('utils/utils.php');
        if(!isset($path[4])){
          //get for shoes?page=0&limit=10&sortby=price
          $query_lst = [];
          $error_lst = [];
          parse_str($path['query'],$query_lst);
          if(!isset($query_lst['page'])){
            $page = 1;
          }
          else{
            if(isNumberID($query_lst['page'])){
              $page = intval($query_lst['page']);
            }
            else{
              $res = ["msg" => "Must is number", "error-field" => "page field"];
              array_push($error_lst, $res);
            }
          }
          
          if(!isset($query_lst['limit'])){
            $limit = 10;
          }
          else{
            if(isNumberID($query_lst['limit'])){
              $limit = intval($query_lst['limit']);
            }
            else{
              $res = ["msg" => "Must is number", "error-field" => "limit field"];
              array_push($error_lst, $res);
            }
          }

          if(!isset($query_lst['sortby'])){
            $sortby = 'time';
          }
          $type = $query_lst['type'];
          $res = $this->model->getAllShoe($page,$limit,$sortby,$type);
          $data = array(
            'data' => array('shoes' => $res)
          );
          http_response_code(200);
          header('Content-Type: application/json');
          echo json_encode($data);
        }
        else if(!isset($path[5])){
          //get for shoes/shoe_id 
        }
      }
    }
  }
?>
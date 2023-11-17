<?php
include_once("models/Model.php");
class CategoryController
{
  public $model;
  public function __construct()
  {
    $this->model = new Model();
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
  public function invoke($method, $parsed, $pathElements)
  {
    if(count($pathElements) > 4){
      $json = $this->pahtNotFound();
      echo $json;
    }
    else{
      if($method == "GET"){
        $res = $this->model->getCategory();
        $data = array(
          'data' => array('categories' => $res)
        );
        http_response_code(200);
        header('Content-Type: application/json');
        $json = json_encode($data);
        echo $json;
      }
      else if($method == "POST"){
        $input = (array) json_decode(file_get_contents('php://input'), true);
        $res = $this->model->addNewCategory($input['name']);
        $data = array(
          'data' => $res
        );
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($data);
      }
      else{
        $data = array(
          'statusCode' => '404',
          'data' => array('error' => 'Method Not Found')
        );
        http_response_code(404);
        header('Content-Type: application/json');
        $json = json_encode($data);
        echo $json;       
      }
    }
  }
}

?>

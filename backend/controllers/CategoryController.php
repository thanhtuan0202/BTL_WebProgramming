<?php
include_once("models/Model.php");
class CategoryController
{
  public $model;
  public function __construct()
  {
    $this->model = new Model();
  }

  public function invoke($method, $parsed, $pathElements)
  {
    
  }
}

?>

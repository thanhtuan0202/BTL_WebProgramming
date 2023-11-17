<?php
    include_once('../models/Shoe.php');
  class ShoesController {
    public $model;
    public function __construct()
    {
      $this->model = new Model();
    }
  }
?>
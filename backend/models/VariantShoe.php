<?php 
class VariantShoe{
    public $id;
    public $color;
    public $model;
    public $size;
    public $shoe_id;

    public function __construct($id,$color,$size,$model,$shoe_id){
        $this->id = $id;
        $this->color = $color;
        $this->size = $size;
        $this->model = $model;
        $this->shoe_id = $shoe_id;
    }
}

?>
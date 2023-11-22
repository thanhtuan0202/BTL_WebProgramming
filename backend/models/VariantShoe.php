<?php 
class VariantShoe{
    public $id;
    public $color;
    public $model;
    public $size;
    public $shoe_id;
    public $in_stock;

    public function __construct($id,$color,$size,$model,$shoe_id,$in_stock){
        $this->id = $id;
        $this->color = $color;
        $this->size = $size;
        $this->model = $model;
        $this->shoe_id = $shoe_id;
        $this->in_stock = $in_stock;
    }
}

?>
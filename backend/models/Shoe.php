<?php
    class Shoe{
        public $id;
        public $name;
        public $price;
        public $description;
        public $category_id;
        public $img_file;
        public function __construct($id,$name,$price,$category_id,$description,$img_file){
            $this->id = $id;
            $this->name = $name;
            $this->price = $price;
            $this->description = $description;
            $this->category_id = $category_id;
            $this->img_file = $img_file;
        }
    }
?>
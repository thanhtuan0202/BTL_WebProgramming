<?php
class CartItem{
    public $vp_id;
    public $vp_name;
    public $price;
    public $color;
    public $size;
    public $quantity;
    public $total_price;
    public $image;
    public function __construct($vp_id, $vp_name, $price, $color, $size, $quantity,$total_price,$image) {
        $this->vp_id = $vp_id;
        $this->vp_name = $vp_name;
        $this->price = $price;
        $this->color = $color;
        $this->size = $size;
        $this->quantity = $quantity;
        $this->total_price = $total_price;
        $this->image = $image;
    }
}
?>
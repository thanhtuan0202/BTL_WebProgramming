<?php 
class Order{
    public $id;
    public $address;
    public $total_price;
    public $create_at;
    public $delivery_time;
    public $status;
    public $user_id;
    public $items;
    public function __construct($id,$address,$total_price,$create_at,$status,$user_id,$items,$delivery_time = null){
        $this->id = $id;
        $this->address = $address;
        $this->total_price = $total_price;
        $this->create_at = $create_at;
        $this->user_id = $user_id;
        $this->delivery_time = $delivery_time;
        $this->items = $items;
        $this->status = $status;
    }
}

?>
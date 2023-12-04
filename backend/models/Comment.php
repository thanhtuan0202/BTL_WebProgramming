<?php
class Comment{
    public $id;
    public $content;
    public $star;
    public $sender_id;
    public $shoe_id;
    public $shoe_name;
    public $create_at;

    public function __construct($id,$content,$star,$sender_id,$shoe_id,$shoe_name,$create_at){
        $this->id = $id;
        $this->content = $content;
        $this->star = $star;
        $this->sender_id = $sender_id;
        $this->shoe_id = $shoe_id;
        $this->create_at = $create_at;
        $this->shoe_name = $shoe_name;
    }
}

?>
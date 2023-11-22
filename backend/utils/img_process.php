<?php

include_once("connect_db.php");
class Image {
    public function __construct() {
    }
    
    public function decodeBase64(string $base) {
        /* get input is base64 and convert to image and store it then return filename*/
        if($base == null){
            return null;
        }
        $id = uniqid();
        $array = explode(',', $base);
        $typ = substr($array[0], 11, 3);
        if ($typ === 'jpe') {
            $typ = 'jpeg';
        }
        if ($typ != 'png' && $typ != 'jpg' && $typ != 'jpeg') {
            return "";
        }
        file_put_contents('img/'.$id. '.'. $typ , base64_decode($array[1]));
        return $id. '.'. $typ;
    }
    // input is file name like default.png and out is like http://localhost/assignment/backend/img/no-img.jpg
    public function getlink($filename) {
        if ($filename == null or $filename == '') {
            $filename = "no-img.jpg";
        }
        $ip_server = $_SERVER['SERVER_NAME'];
        $port_server = $_SERVER['SERVER_PORT'];
        $imagelink = 'http://'. $ip_server . ':' . $port_server . '/assignment/backend/img/' .$filename;
        return $imagelink;
    }
}

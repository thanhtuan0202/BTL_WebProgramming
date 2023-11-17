<?php

include_once("connect_db.php");
class Image {
    public function __construct() {
    }
    
    public function decodeBase64(string $base) {
        /* get input is base64 and convert to image and store it then return filename*/

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
    // input is file name like default.png and out is like http://localhost:8000/img/default.png
    public function getlink($filename) {
        if ($filename == null or $filename == '') {
            $filename = "default.png";
        }
        $ip_server = $_SERVER['SERVER_NAME'];
        $port_server = $_SERVER['SERVER_PORT'];
        $imagelink = 'http://'. $ip_server . ':' . $port_server . '/img/' .$filename;
        return $imagelink;
    }
}

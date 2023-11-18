<?php
    class DBConnection {
        public $conn = null;

        public function __construct() {
            $servername = "localhost";
            $username = "root";
            $password = "1109";
            $dbname = "shopping";
            $this->conn = new mysqli($servername, $username, $password, $dbname, 3306);
            $this->conn->options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, TRUE);
            if ($this->conn->connect_error) {
                die("Connection failed: " . $this->conn->connect_error);
            }
            
        }

        public function getConn() {
            return $this->conn;
        }
    }

?>
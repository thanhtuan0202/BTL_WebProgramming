<?php
    include_once("../utils/connect_db.php");
    class Shoe{
        public $id;
        public $username;
        public $password;
        public $fullname;
        public $dob;
        public $address;
        public $role;
        public $email;
        public $phone;
        public $gender;
        private $conn;
        public function __construct($id, $username, $password, $fullname, $dob, $address, $role, $email, $phone,$gender){
            $this->id = $id;
            $this->username = $username;
            $this->password = $password;
            $this->fullname = $fullname;
            $this->dob = $dob;
            $this->address = $address;
            $this->role = $role;
            $this->email = $email;
            $this->phone = $phone;
            $this->gender = $gender;
            try {
                $this->conn = (new DBConnection())->getConn();
            } catch (PDOException $e) {
                die('Connection failed: ' . $e->getMessage());
            }
        }
        public function getAllUser(){
            $stmt = $this->conn->query('select * from user');
            $users = $stmt->fetch_all(MYSQLI_ASSOC);
            return $users;
        }
    }
?>
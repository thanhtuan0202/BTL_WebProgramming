<?php
    class User{
        public $id;
        public $username;
        public $fullname;
        public $dob;
        public $address;
        public $email;
        public $phone;
        public $gender;
        public function __construct($id, $username, $fullname, $dob, $address, $email, $phone,$gender){
            $this->id = $id;
            $this->username = $username;
            $this->fullname = $fullname;
            $this->dob = $dob;
            $this->address = $address;
            $this->email = $email;
            $this->phone = $phone;
            $this->gender = $gender;
        }
    }
?>
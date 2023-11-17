<?php
include_once("models/User.php");
include_once("utils/connect_db.php");
    class Model{
        private $conn;
        public function __construct() {
            $this->conn = (new DBConnection())->getConn();
        }

        // User Service
        public function login($username, $password){
            try{
                $pre_stmt = $this->conn->prepare("select * from user where username = ? and password = ?");
                $pre_stmt->bind_param("ss", $username,$password);
                $pre_stmt->execute();
                $temp = $pre_stmt->get_result();
                // var_dump($temp->fetch_all(MYSQLI_ASSOC));
                if($temp->num_rows == 0){
                    return null;
                }
                else{
                    $res = $temp->fetch_assoc();
                    return array(
                        "username"=> $res["username"],
                        "role"=> $res["role"],
                        "fullname"=> $res["fullname"],
                    );
                    
                }
            }
            catch(Exception $e){
                $res = ["error" => $e->getMessage()];
                return $res;
            }
        }
        public function register($username, $password, $fullname,$phone,$dob,$gender){
            try{
                $pre_stmt = $this->conn->prepare("insert into user (username,password,fullname,phone,dob,gender) values (?,?,?,?,?,?)");
                $pre_stmt->bind_param("ssssss", $username,$password,$fullname,$phone,$dob,$gender);
                $pre_stmt->execute();
                $res = ["success" => "Tạo tài khoản thành công!"];
                return $res;
            }
            catch(Exception $e){
                $res = ["error" => $e->getMessage()];
                return $res;
            }
        }

        public function getUserDetail($user_id){
            try{
                $pre_stmt = $this->conn->prepare("select * from user where id = ?");
                $pre_stmt->bind_param("s", $user_id);
                $pre_stmt->execute();
                $temp = $pre_stmt->get_result();
                // var_dump($temp->fetch_all(MYSQLI_ASSOC));
                if($temp->num_rows == 0){
                    return null;
                }
                else{
                    $res = $temp->fetch_assoc();
                    $user_info = new User($res['id'],$res['username'],$res['fullname'],$res['dob'],$res['address'],$res['email'],$res['phone'],$res['gender']);
                    return $user_info;
                }
            }
            catch(Exception $e){
                $res = ["error" => $e->getMessage()];
                return $res;
            }
        }

        public function changeUserPassword($old,$new,$confirm,$user_id){
            if($new !== $confirm){
                $res = ["error" => "Mật khẩu mới không khớp, vui lòng nhập lại", "error-field" => "confirm_pass"];
                return $res;
            }
            try{
                $pre_stmt = $this->conn->prepare("select password from user where id = ?");
                $pre_stmt->bind_param("s", $user_id);
                $pre_stmt->execute();
                $temp = $pre_stmt->get_result();
                // var_dump($temp->fetch_all(MYSQLI_ASSOC));
                if($temp->num_rows == 0){
                    return null;
                }
                else{
                    $res = $temp->fetch_assoc();
                    if($res['password'] !== $old){
                        $res = ["error" => "Mật khẩu không đúng!", "error-field" => "old_pass"];
                        return $res;                       
                    }
                    else{
                        $pre_stmt = $this->conn->prepare("update user set password = ? where id = ?");
                        $pre_stmt->bind_param("ss",$new, $user_id);
                        $pre_stmt->execute();
                        $res = ["success" => "Thay đổi mật khẩu thành công!"];
                        return $res;                       
                    }
                }                
            }
            catch(Exception $e){
                $res = ["error" => $e->getMessage()];
                return $res;
            }
        }

        public function changeUserInfo($user_id, $fullname, $email, $address, $dob,$phone,$gender){
            try{
                $pre_stmt = $this->conn->prepare("update user set fullname = ?,email=?,address=?,dob=?,phone=?,gender=? where id = ?");
                $pre_stmt->bind_param("sssssss", $fullname,$email,$address,$dob,$phone,$gender,$user_id);
                $pre_stmt->execute();
                $res = ["success" => "Thay đổi thông tin thành công!"];
                return $res;
            }
            catch(Exception $e){
                return ['error' => $e->getMessage()];
            }
        }
    }
?>
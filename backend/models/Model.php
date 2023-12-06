<?php
include_once("models/User.php");
include_once("models/Category.php");
include_once("models/Shoe.php");
include_once("utils/connect_db.php");
class Model
{
    private $conn;
    public function __construct()
    {
        $this->conn = (new DBConnection())->getConn();
    }

    // User Service
    public function login($username, $password)
    {
        try {
            $pre_stmt = $this->conn->prepare("select * from user us, role r, user_role ur 
            where us.id = ur.user_id and r.id = ur.role_id and username = ? and password = ?");
            $pre_stmt->bind_param("ss", $username, $password);
            $pre_stmt->execute();
            $temp = $pre_stmt->get_result();
            // var_dump($temp->fetch_all(MYSQLI_ASSOC));
            if ($temp->num_rows == 0) {
                return null;
            } else {
                $res = $temp->fetch_assoc();
                include_once("utils/jwt.php");
                $token =  gen_jwt($res["username"], $res["user_id"], $res["name"]);
                $res = array(
                    'token' => $token,
                    'user' => array(
                        'id' => $res["user_id"],
                        'username' => $res["username"],
                        'name' => $res["fullname"],
                        'role' => $res["name"],
                    )
                );
                return $res;
            }
        } catch (Exception $e) {
            $res = ["error" => $e->getMessage()];
            return $res;
        }
    }
    public function register($username, $password, $fullname, $phone, $dob, $gender)
    {
        try {
            $pre_stmt = $this->conn->prepare("insert into user (username,password,fullname,phone,dob,gender) values (?,?,?,?,?,?)");
            $pre_stmt->bind_param("ssssss", $username, $password, $fullname, $phone, $dob, $gender);
            $pre_stmt->execute();
            $user_id = $this->conn->insert_id;
            $query = "insert into user_role(user_id,role_id) values($user_id,2);";
            $this->conn->query($query);
            $res = ["success" => "Tạo tài khoản thành công!"];
            return $res;
        } catch (Exception $e) {
            $res = ["error" => $e->getMessage()];
            return $res;
        }
    }

    public function getUserDetail($user_id)
    {
        try {
            $pre_stmt = $this->conn->prepare("select * from user where id = ?");
            $pre_stmt->bind_param("s", $user_id);
            $pre_stmt->execute();
            $temp = $pre_stmt->get_result();
            // var_dump($temp->fetch_all(MYSQLI_ASSOC));
            if ($temp->num_rows == 0) {
                return null;
            } else {
                $res = $temp->fetch_assoc();
                $user_info = new User($res['id'], $res['username'], $res['fullname'], $res['dob'], $res['email'], $res['phone'], $res['gender']);
                return $user_info;
            }
        } catch (Exception $e) {
            $res = ["error" => $e->getMessage()];
            return $res;
        }
    }

    public function changeUserPassword($old, $new, $confirm, $user_id)
    {
        if ($new !== $confirm) {
            $res = ["error" => "Mật khẩu mới không khớp, vui lòng nhập lại", "error-field" => "confirm_pass"];
            return $res;
        }
        try {
            $pre_stmt = $this->conn->prepare("select password from user where id = ?");
            $pre_stmt->bind_param("s", $user_id);
            $pre_stmt->execute();
            $temp = $pre_stmt->get_result();
            // var_dump($temp->fetch_all(MYSQLI_ASSOC));
            if ($temp->num_rows == 0) {
                return null;
            } else {
                $res = $temp->fetch_assoc();
                if ($res['password'] !== $old) {
                    $res = ["error" => "Mật khẩu không đúng!", "error-field" => "old_pass"];
                    return $res;
                } else {
                    $pre_stmt = $this->conn->prepare("update user set password = ? where id = ?");
                    $pre_stmt->bind_param("ss", $new, $user_id);
                    $pre_stmt->execute();
                    $res = ["success" => "Thay đổi mật khẩu thành công!"];
                    return $res;
                }
            }
        } catch (Exception $e) {
            $res = ["error" => $e->getMessage()];
            return $res;
        }
    }

    public function changeUserInfo($user_id, $fullname, $email, $address, $dob, $phone, $gender)
    {
        try {
            $query = "update user set fullname = ?,email=?,dob=?,phone=? where id = $user_id";
            $pre_stmt = $this->conn->prepare($query);
            $pre_stmt->bind_param("ssss", $fullname, $email, $dob, $phone);
            $pre_stmt->execute();
            $res = ["success" => "Thay đổi thông tin thành công!"];
            return $res;
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    // Category Services

    public function getCategory()
    {
        try {
            $stmt = $this->conn->query("select * from category");
            if ($stmt->num_rows > 0) {
                // output data of each row
                $res = [];
                while ($row = $stmt->fetch_assoc()) {
                    array_push($res, new Category($row["id"], $row["name"]));
                }
                return $res;
            } else {
                return ['error' => "Something went wrong!"];
            }
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function addNewCategory($name)
    {
        try {
            $stmt = $this->conn->prepare("insert into category(name) values (?)");
            $stmt->bind_param("s", $name);
            $stmt->execute();
            $res = array(
                'success' => 'Thêm thành công!'
            );
            return $res;
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }


    // Product Service 

    public function getAllShoe($page, $limit, $sortby, $type)
    {
        try {
            $query = "SELECT * FROM shoe ORDER BY $sortby $type LIMIT ? OFFSET ?";
            $pre_stmt = $this->conn->prepare($query);
            $offset = $limit * $page;
            $pre_stmt->bind_param("ii", $limit, $offset);
            $pre_stmt->execute();
            $tmp = $pre_stmt->get_result();
            if ($tmp->num_rows > 0) {
                // output data of each row
                $res = [];
                while ($row = $tmp->fetch_assoc()) {
                    include_once("utils/img_process.php");
                    $img = new Image();
                    $img_link = $img->getlink($row["img_id"]);
                    include_once("models/CommentModel.php");
                    $cmt = new CommentModel();
                    $star_avg = $cmt->calAvgStar($row["id"]);
                    array_push($res, new Shoe($row["id"], $row["name"], $row["price"], $row["category_id"], $row["description"], $img_link, $star_avg));
                }
                return $res;
            } else {
                return null;
            }
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function getAllShoeAdmin($page, $limit, $sortby, $type)
    {
        try {
            $sell = [];
            $shoe_lst = $this->getAllShoe($page, $limit, $sortby, $type);
            foreach ($shoe_lst as $item) {
                $pid  = $item->id;
                $stmt = $this->conn->prepare("select product_id, sum(quantity) as sum from cart_line cl, variant_product vp 
                where vp.id = cl.vp_id and vp.product_id = ? and is_delete = true 
                group by vp.product_id");
                $stmt->bind_param("i", $pid);
                $stmt->execute();
                $tmp = $stmt->get_result();
                if($tmp->num_rows > 0){
                    while ($row = $tmp->fetch_assoc()) {
                        array_push(
                            $sell,
                            array(
                                "id" => $item->id,
                                "sell" => $row["sum"]
                            )
                        );
                    }
                }
                else{
                    array_push(
                        $sell,
                        array(
                            "id" => $pid,
                            "sell" => 0
                        )
                    );
                }
            }
            return array(
                "shoes" => $shoe_lst,
                "sells" => $sell
            );
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function getShoeById($id)
    {
        try {
            $pre_stmt = $this->conn->prepare("SELECT * FROM shoe WHERE id = ?");
            $pre_stmt->bind_param('s', $id);
            $pre_stmt->execute();
            $tmp = $pre_stmt->get_result();
            if ($tmp->num_rows > 0) {
                // output data of each row
                while ($row = $tmp->fetch_assoc()) {
                    include_once("utils/img_process.php");
                    $img = new Image();
                    $img_link = $img->getlink($row["img_id"]);
                    include_once("models/CommentModel.php");
                    $cmt = new CommentModel();
                    $star_avg = $cmt->calAvgStar($id);
                    $res =  new Shoe($row["id"], $row["name"], $row["price"], $row["category_id"], $row["description"], $img_link, $star_avg);
                }
                return $res;
            } else {
                return [];
            }
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function getShoeByCategory($category, $page, $limit, $sortby, $type)
    {
        try {
            // $pre_stmt = $this->conn->prepare('SELECT * FROM shoe WHERE category_id = ?  LIMIT ? OFFSET ? ORDER BY ? ?');
            // $offset = (int)$limit * (int)$page;
            $query = "SELECT * FROM shoe WHERE category_id = ? ORDER BY $sortby $type LIMIT ? OFFSET ?";
            $pre_stmt = $this->conn->prepare($query);
            $offset = $limit * $page;
            $pre_stmt->bind_param('sss', $category, $limit, $offset);
            $pre_stmt->execute();
            $tmp = $pre_stmt->get_result();
            if ($tmp->num_rows > 0) {
                // output data of each row
                $res = [];
                while ($row = $tmp->fetch_assoc()) {
                    include_once("utils/img_process.php");
                    $img = new Image();
                    $img_link = $img->getlink($row["img_id"]);
                    include_once("models/CommentModel.php");
                    $cmt = new CommentModel();
                    $star_avg = $cmt->calAvgStar($row["id"]);
                    array_push($res, new Shoe($row["id"], $row["name"], $row["price"], $row["category_id"], $row["description"], $img_link, $star_avg));
                }
                return $res;
            } else {
                return null;
            }
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function searchShoeByName(string $name)
    {
        try {
            $query = "SELECT * FROM shoe WHERE name LIKE '%$name%'";
            $stmt = $this->conn->query($query);
            if ($stmt->num_rows > 0) {
                // output data of each row
                $res = [];
                while ($row = $stmt->fetch_assoc()) {
                    include_once("utils/img_process.php");
                    $img = new Image();
                    $img_link = $img->getlink($row["img_id"]);
                    include_once("models/CommentModel.php");
                    $cmt = new CommentModel();
                    $star_avg = $cmt->calAvgStar($row["id"]);
                    array_push($res, new Shoe($row["id"], $row["name"], $row["price"], $row["category_id"], $row["description"], $img_link, $star_avg));
                }
                return $res;
            } else {
                return [];
            }
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function addNewShoe(string $name, int $category_id, int $price, string $description, string $base64, $variant)
    {
        try {
            include_once("utils/img_process.php");
            if (!empty($base64)) {
                $image = new Image();
                $filename = $image->decodeBase64($base64);
                if ($filename == "") {
                    $res = ["result" => "fail", "message" => "type of image must be png or jpg"];
                    return $res;
                }
            }
            $query = "INSERT INTO shoe(name,category_id,price,create_at,img_id,description) values(?,?,?,now(),?,?)";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("siiss", $name, $category_id, $price, $filename,$description);
            $stmt->execute();
            $shoe_id = $this->conn->insert_id;
            foreach ($variant as $item) {
                $query = "INSERT INTO variant_product(color,size,model,in_stock,product_id) values('black',?,'2023',?,$shoe_id)";
                $stmt = $this->conn->prepare($query);
                $stmt->bind_param("si", $item["size"], $item["in_stock"]);
                $stmt->execute();
                $stmt->close();
            }
            $res = array(
                'success' => 'Thêm thành công!'
            );
            return $res;
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function changeShoeDetail(int $shoe_id, int $price, string $description, string $base64, $variant)
    {
        try {
            include_once("utils/img_process.php");
            if (!empty($base64)) {
                $image = new Image();
                $filename = $image->decodeBase64($base64);
                if ($filename == "") {
                    $res = ["result" => "fail", "message" => "type of image must be png or jpg"];
                    return $res;
                }
            }
            $query = "UPDATE shoe SET price = ?, description = ?, image = ? WHERE id = $shoe_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("iss", $price, $description, $filename);
            $stmt->execute();
            $res = array(
                'success' => 'Chỉnh sửa thành công!'
            );
            return $res;
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }
}

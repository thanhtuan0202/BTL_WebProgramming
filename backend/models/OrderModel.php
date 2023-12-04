<?php
include_once("utils/connect_db.php");
include_once("models/Order.php");
class OrderModel{
    private $conn;

    public function __construct(){
        $this->conn = (new DBConnection())->getConn();
    }

    public function analysis(){
        try{
            $stmt1 = $this->conn->query("SELECT count(id) as count,sum(total_price) as sum  FROM shopping.orders where status = 'done'");
            if($stmt1->num_rows > 0){
                $res1 = $stmt1->fetch_assoc();
            }
            $stmt2 = $this->conn->query("SELECT count(id) as count,sum(total_price) as sum  FROM shopping.orders where status = 'waiting'");
            if($stmt2->num_rows > 0){
                $res2 = $stmt2->fetch_assoc();
            }
            $stmt3 = $this->conn->query("SELECT count(id) as count,sum(total_price) as sum  FROM shopping.orders where status = 'delete'");
            if($stmt3->num_rows > 0){
                $res3 = $stmt3->fetch_assoc();
            }
            $stmt4 = $this->conn->query("SELECT count(id) as count,sum(total_price) as sum  FROM shopping.orders where status = 'on-delivery'");
            if($stmt4->num_rows > 0){
                $res4 = $stmt4->fetch_assoc();
            }
            return array(
                'sum' => round($res1["sum"],2),
                'done' => $res1["count"],
                'waiting' => $res2["count"],
                'delete' => $res3["count"],
                'delivery' => $res4["count"]
            );
        }
        catch(Exception $e){
            return ["error"=> $e->getMessage()];
        }
    }
    public function getAllOrders($page,$status){
        try{
            $offset = ($page - 1) * 10;
            if($status == null){
                $stmt = $this->conn->prepare("SELECT * FROM orders ORDER BY create_at DESC LIMIT 10 OFFSET ?");
                $stmt->bind_param("s",$offset);
            }
            else{
                $stmt = $this->conn->prepare("SELECT * FROM orders WHERE status = ? ORDER BY create_at DESC LIMIT 10 OFFSET ?");
                $stmt->bind_param("ss",$status,$offset);
            }
            
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0){
                $res = [];
                while($row = $result->fetch_assoc()){
                    array_push($res, 
                    new Order($row["id"],$row["address"],$row["total_price"],$row["create_at"],$row["status"],$row["user_id"],$row["phone_number"],$row["payment_method"],null,
                    $row["delivery_time"])
                );
                }
                return array(
                    'order' => $res,
                    'analyst' => $this->analysis()
                );
            }
            else{
                return [];
            }
        }
        catch(Exception $e){
            return ["error"=> $e->getMessage()];
        }
    }

    public function getOrdersByUserId($page, $user_id){
        try{
            $offset = ($page - 1) * 10;
            $stmt = $this->conn->prepare("SELECT * FROM orders where user_id = ? ORDER BY create_at DESC LIMIT 10 OFFSET ?");
            $stmt->bind_param("ss",$user_id,$offset);
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0){
                $res = [];
                while($row = $result->fetch_assoc()){
                    array_push($res, new Order($row["id"],$row["address"],$row["total_price"],$row["create_at"],$row["status"],$row["user_id"],$row["phone_number"],$row["payment_method"],null,$row["delivery_time"]));
                }
                return $res;
            }
            else{
                return [];
            }
        }
        catch(Exception $e){
            return ["error"=> $e->getMessage()];
        }  
    }
    public function detailOrderAdmin($order_id){
        try{
            //query order infomation
            $stmt = $this->conn->prepare("SELECT * FROM orders WHERE id = ?");
            $stmt->bind_param("i",$order_id);
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $order_info = $row;
                }
            }
            else{
                return null;
            }
            include_once("models/CartModel.php");
            $cart_model = new CartModel();
            $item_lst = $cart_model->getItemsByOrder($order_id);
            return new Order($order_info["id"],$order_info["address"],$order_info["total_price"],$order_info["create_at"],
                $order_info["status"],$order_info["user_id"],$row["phone_number"],$row["payment_method"],$item_lst,$order_info["delivery_time"]);
        }
        catch(Exception $e){
            return ["error"=> $e->getMessage()];
        }
    }
    public function getDetailOrder($order_id,$user_id){
        try{
            //query order infomation
            $stmt = $this->conn->prepare("SELECT * FROM orders WHERE id = ? and user_id = ?");
            $stmt->bind_param("ii",$order_id, $user_id);
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $order_info = $row;
                }
            }
            else{
                return null;
            }
            include_once("models/CartModel.php");
            $cart_model = new CartModel();
            $item_lst = $cart_model->getItemsByOrder($order_id);
            return new Order($order_info["id"],$order_info["address"],$order_info["total_price"],$order_info["create_at"],
                $order_info["status"],$order_info["user_id"],$row["phone_number"],$row["payment_method"],$item_lst,$order_info["delivery_time"]);
        }
        catch(Exception $e){
            return ["error"=> $e->getMessage()];
        }
    }

    public function getOrderByItemInOrder($shoe_id){
        try{
            $stmt = $this->conn->prepare("");
        }
        catch(Exception $e){
            return ["error"=> $e->getMessage()];
        }
    }

    // POST
    public function addNewOrder($user_id,$address,$phone_number,$payment){
        try{
            include_once("models/CartModel.php");
            $cart = new CartModel();
            $cart_item = $cart->getCartItems($user_id);
            
            if($cart_item == null){
                $res = array(
                    'msg' => 'Something went wrong!'
                );
                return $res;
            }
            else{
                $total_price = 0;
                foreach($cart_item as $item){
                    $total_price += $item->total_price;
                }
                $query = "INSERT INTO orders (user_id,address,phone_number,total_price,payment_method,create_at) values ($user_id,?,?,?,?,now())";
                $stmt = $this->conn->prepare($query);
                $stmt->bind_param("ssss", $address,$phone_number,$total_price,$payment);
                $stmt->execute();
                $id = $this->conn->insert_id;
                
                $query = "UPDATE cart_line SET is_delete = 1 and order_id = $id WHERE user_id = $user_id and is_delete = 0";
                $stmt = $this->conn->prepare($query);
                $stmt->execute();

                $res = array(
                    'msg' => 'Thêm thành công!'
                );
                return $res;
            }

        }
        catch(Exception $e ){
            return ["error"=> $e->getMessage()];
        }
    }

    // public function addNewOrderWithSpecificProduct($user_id,$address,$phone_number,$vp_id){
    //     try{
            
    //     }
    //     catch(Exception $e){
    //         return ["error"=> $e->getMessage()];
    //     }
    // }
}

?>
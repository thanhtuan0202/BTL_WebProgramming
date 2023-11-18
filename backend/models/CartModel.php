<?php
include_once("models/Category.php");
include_once("models/Cart.php");
include_once("utils/connect_db.php");
include_once('utils/utils.php');
class CartModel
{
    private $conn;
    public function __construct()
    {
        $this->conn = (new DBConnection())->getConn();
    }

    public function getCartItems($usr_id){
        try{
            $query = "SELECT c.id, vp.id as pid,p.name,p.price,vp.color,vp.size, quantity,total_price,c.create_at 
            from cart_line c, variant_product vp, shoe p
            where user_id = ? and is_delete = 0 and c.vp_id = vp.id and p.id = vp.product_id
            order by create_at desc";
            $stmt = $this->conn->prepare($query); 
            $stmt->bind_param('s',$usr_id);
            $stmt->execute();
            $tmp = $stmt->get_result();
            if ($tmp->num_rows > 0) {
                // output data of each row
                $res = [];
                while ($row = $tmp->fetch_assoc()) {
                    array_push($res, 
                    new CartItem($row["pid"],$row["name"],$row["price"],$row["color"],$row["size"],$row["quantity"],$row["total_price"])
                    );
                }
                return $res;
            }
            else{ 
                return null;
            }          

        }
        catch(Exception $e){
            return ["error" => $e->getMessage()];;
        }
    }

    public function addNewItemToCart($usr_id,$vp_id,$quantity,$pid){
        try{      
            $pre_stmt = $this->conn->prepare("SELECT * FROM shoe WHERE id = ?");
            $pre_stmt->bind_param('i',$pid);
            $pre_stmt->execute();
            $tmp = $pre_stmt->get_result();

            if ($tmp->num_rows > 0) {
                // output data of each row
                while ($row = $tmp->fetch_assoc()) {
                    $p_price = $row["price"];
                }
            }
            else{
                return ["error"=> "Something went wrong!"];
            }

            $is_exist = $this->conn->prepare("SELECT * FROM cart_line WHERE vp_id = ? and user_id = ?");
            $is_exist->bind_param('ii',$vp_id,$usr_id);
            $is_exist->execute();
            $tmp = $is_exist->get_result();

            if($tmp->num_rows > 0) {
                while ($row = $tmp->fetch_assoc()) {
                    $total_price = $row["total_price"] + $p_price * $quantity;
                    $quantity = $quantity + $row["quantity"];
                }
                $query = $this->conn->prepare("UPDATE cart_line set total_price = ?,quantity = ? WHERE vp_id = ? AND user_id = ?");
                $query->bind_param("ssss",$total_price,$quantity,$pid,$usr_id);
                $query->execute();
            }
            else{
                $total_price = $p_price * $quantity;
                $query = "INSERT INTO cart_line(vp_id,quantity,total_price,user_id,create_at,is_delete) VALUES (?,?,?,?,now(),0) ";
                $stmt = $this->conn->prepare($query); 
                $stmt->bind_param('ssss',$vp_id,$quantity,$total_price,$usr_id);
                $stmt->execute();
                $tmp = $stmt->get_result();
            }
            $res = array(
                'msg' => 'Thêm thành công!'
            );
            return $res;
        }
        catch(Exception $e){
            return ["error"=> $e->getMessage()];
        }
    }

    public function removeItemInCart($usr_id, $vp_id){
        try{
            $query = "DELETE FROM cart_line WHERE vp_id = ? AND user_id = ?";
            $stmt = $this->conn->prepare($query); 
            $stmt->bind_param('ii',$vp_id,$usr_id);
            $stmt->execute();
            $tmp = $stmt->get_result();
            $res = array(
                'msg' => 'Xoá thành công!'
            );
            return $res;
        }
        catch(Exception $e){
            return ["error"=> $e->getMessage()];
        }
    }
}

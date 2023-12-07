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
            $query = "SELECT c.id, vp.id as pid,p.name,p.price,vp.color,vp.size, quantity,total_price,c.create_at ,img_id
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
                $total_price = 0;
                while ($row = $tmp->fetch_assoc()) {
                    include_once("utils/img_process.php");
                    $img = new Image();
                    $img_link = $img->getlink($row["img_id"]);
                    $total_price = $total_price + $row["total_price"];
                    array_push($res, 
                    new CartItem($row["pid"],$row["name"],$row["price"],$row["color"],$row["size"],$row["quantity"],$row["total_price"],$img_link)
                    );
                }
                return array(
                    'carts' => $res,
                    'total_price' => round($total_price,2)
                );
            }
            else{ 
                return null;
            }          

        }
        catch(Exception $e){
            return ["error" => $e->getMessage()];;
        }
    }
    public function getItemById($vp_id,$usr_id){
        try{
            $query = "SELECT c.id, vp.id as pid,p.name,p.price,vp.color,vp.size, quantity,total_price,c.create_at ,img_id
            from cart_line c, variant_product vp, shoe p
            where user_id = ? and is_delete = 0 and vp_id = ?  and c.vp_id = vp.id and p.id = vp.product_id
            order by create_at desc";
            $stmt = $this->conn->prepare($query); 
            $stmt->bind_param('ss',$usr_id,$vp_id);
            $stmt->execute();
            $tmp = $stmt->get_result();
            if ($tmp->num_rows > 0) {
                // output data of each row
                $res = [];
                while ($row = $tmp->fetch_assoc()) {
                    include_once("utils/img_process.php");
                    $img = new Image();
                    $img_link = $img->getlink($row["img_id"]);
                    array_push($res, 
                    new CartItem($row["pid"],$row["name"],$row["price"],$row["color"],$row["size"],$row["quantity"],$row["total_price"],$img_link)
                    );
                }
                return $res;
            }
            else{ 
                return null;
            }
        }
        catch(Exception $e){
            return ["error"=> $e->getMessage()];
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
                $query->bind_param("ssss",$total_price,$quantity,$vp_id,$usr_id);
                $query->execute();
                $tmp = $query->get_result();
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
            if($tmp->num_rows > 0) {
                $res = array(
                    'msg' => 'Xoá thành công!'
                );
                return $res;
            }
            else{
                return null;
            }

        }
        catch(Exception $e){
            return ["error"=> $e->getMessage()];
        }
    }

    public function getItemsByOrder($order_id){
        try{
            $stmt = $this->conn->prepare("select product_id,name,color,model,size,price,quantity,total_price, img_id 
                                            from cart_line cl, variant_product vs, shoe s 
                                            where order_id = ? and cl.vp_id = vs.id and vs.product_id = s.id
                                            order by total_price desc;");
            $stmt->bind_param("s",$order_id);
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0){
                $res = [];
                while($row = $result->fetch_assoc()){
                    include_once("utils/img_process.php");
                    $img = new Image();
                    $img_link = $img->getlink($row["img_id"]);
                    $row["img_id"] = $img_link;
                    array_push($res, $row);
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
}

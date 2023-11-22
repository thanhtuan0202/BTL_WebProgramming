<?php
include_once("utils/connect_db.php");
include_once("models/VariantShoe.php");
class VariantShoeModel{
    private $conn;
    public function __construct(){
        $this->conn = (new DBConnection())->getConn();
    }

    public function getVariantShoe($shoe_id){
        try{
            $stmt = $this->conn->prepare("SELECT * FROM variant_product WHERE product_id = ?");
            $stmt->bind_param("s",$shoe_id);
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0){
                $res = [];
                while($row = $result->fetch_assoc()){
                    array_push($res, new VariantShoe($row["id"],$row["color"],$row["size"],$row["model"],$row["product_id"],$row["in_stock"]));
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

    public function addNewVariantForProduct($shoe_id, $input){
        try{
            $variant = $input["variants"];
            foreach($variant as $item){
                $query = "INSERT INTO variant_product(color,size,model,in_stock,product_id) values(?,?,?,?,$shoe_id)";
                $stmt = $this->conn->prepare($query);
                $stmt->bind_param("sssi", $item["color"],$item["size"],$item["model"],$item["in_stock"]);
                $stmt->execute();
                $stmt->close();
            }
            $res = array(
                'success' => 'Thêm thành công!'
            );
            return $res;
        }
        catch(Exception $e){
            return ["error"=> $e->getMessage()];
        }
    }

    public function changeIn_Stock($vp_id, $value){
        try{
            $query = "UPDATE variant_product SET in_stock = ? WHERE id = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ii",$vp_id,$value);
            $stmt->execute();
            $stmt->close();
            $res = array(
                'success' => 'Successfull'
            );
            return $res;
        }
        catch(Exception $e){
            return ["error"=> $e->getMessage()];
        }
    }
}

?>
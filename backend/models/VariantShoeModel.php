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
            $stmt = $this->conn->prepare("SELECT * FROM variant_shoe WHERE shoe_id = ?");
            $stmt->bind_param("s",$shoe_id);
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0){
                $res = [];
                while($row = $result->fetch_assoc()){
                    array_push($res, new VariantShoe($row["id"],$row["color"],$row["size"],$row["model"],$row["shoe_id"]));
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

?>
<?php
include_once("utils/utils.php");
include_once("utils/connect_db.php");
include_once("models/Comment.php");
class CommentModel{
    private $conn;
    public function __construct()
    {
        $this->conn = (new DBConnection())->getConn();
    }

    public function getCommentOfShoe($shoe_id, $page){
        try{
            $offset = ($page - 1) * 5;
            $stmt = $this->conn->prepare("SELECT * FROM comment cmt,user usr
            where cmt.sender_id = usr.id and shoe_id = ?
            ORDER BY create_at DESC LIMIT 10 OFFSET ?");
            $stmt->bind_param("ss",$shoe_id,$offset);
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0){
                $res = [];
                while($row = $result->fetch_assoc()){
                    array_push($res, new Comment($row["id"],$row["content"],$row["star"],$row["fullname"],$row["shoe_id"],$row["create_at"]));
                }
                return $res;
            }
            else{
                return [];
            }
        }
        catch(Exception $e){
            return ["error" => $e->getMessage()];
        }
    }

    public function addNewComment($content,$start,$sender_id,$shoe_id){
        try{
            $stmt = $this->conn->prepare("INSERT INTO comment(content,star,sender_id,shoe_id,create_at) VALUES(?,?,?,?,now())");
            $stmt->bind_param("ssss",$content,$start,$sender_id,$shoe_id);
            $stmt->execute();
            $res = array(
                'msg' => 'Thêm thành công!'
            );
            return $res;
        }
        catch(Exception $e){
            return ["error"=> $e->getMessage()];
        }


    }
    public function getAllComments($page){
        try{
            $offset = ($page - 1) * 5;
            $stmt = $this->conn->prepare("SELECT * FROM comment cmt,user usr
            where cmt.sender_id = usr.id
            ORDER BY create_at DESC LIMIT 10 OFFSET ?");
            $stmt->bind_param("s",$offset);
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0){
                $res = [];
                while($row = $result->fetch_assoc()){
                    array_push($res, new Comment($row["id"],$row["content"],$row["star"],$row["sender_id"],$row["shoe_id"],$row["create_at"]));
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

    public function calAvgStar($shoe_id){
        try{
            $stmt = $this->conn->prepare("SELECT avg(star) as star FROM comment 
            where shoe_id = ? group by shoe_id");
            $stmt->bind_param('i', $shoe_id);
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $res = $row["star"];    
                }
                return round($res,1);
            }
            else{
                return 0;
            }
        }
        catch(Exception $e){
            return ["error"=> $e->getMessage()];
        }
    }
}

?>
<?php
include_once('models/CommentModel.php');
class CommentController
{
    public $model;
    public function __construct()
    {
        $this->model = new CommentModel();
    }
    protected function pahtNotFound()
    {
        $data = array(
            'statusCode' => '404',
            'data' => array('error' => 'Path Not Found')
        );
        http_response_code(404);
        header('Content-Type: application/json');
        $json = json_encode($data);
        return $json;
    }
    public function invoke($method, $parsed, $path, $token = null)
    {
        include_once("utils/jwt.php");
        if ($token != null) {
            $payload = decode_jwt($token)["payload"];
        }
        if ($method == "GET") {
            $query_lst = [];
            parse_str($parsed['query'], $query_lst);
            if (isset($query_lst['page'])) {
                $page = $query_lst['page'];
            } else {
                $page = 1;
            }
            if (isset($path[4])) {
                $res = $this->model->getCommentOfShoe($path[4], $page);
                $data = array(
                    'data' => array('comments' => $res)
                );
            } else {
                if($payload["role"] == "admin"){
                    $res = $this->model->getAllComments($page);
                    $data = array(
                        'data' => array('comments' => $res)
                    );
                }
            }
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($data);
        } else if ($method == "POST") {
            if ($token == null) {
                $data = array(
                    'data' => array('error' => 'FORBIDDEN')
                );
                http_response_code(403);
                header('Content-Type: application/json');
                echo json_encode($data);
            } else {
                $input = (array) json_decode(file_get_contents('php://input'), true);
                $res = $this->model->addNewComment($input["content"], $input["star"], $payload["user_id"], $input["shoe"]);
                $data = array(
                    'data' => $res
                );
                http_response_code(200);
                header('Content-Type: application/json');
                echo json_encode($data);
            }
        } else {
            echo $this->pahtNotFound();
        }
    }
}

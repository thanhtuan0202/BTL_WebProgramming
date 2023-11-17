<?php

class Controller{
    public function invoke($method, $parsed){
        $path = $parsed['path'];
        $pathElements = explode('/', trim($path, '/'));
        if (isset($pathElements[3])) {
            if($pathElements[3] === 'users'){
                include_once("UserController.php");
                $userController = new UserController();
                $userController->invoke($method,$parsed,$pathElements);
                
            }
            else if($pathElements[3] === 'shoes'){

            }
            else if($pathElements[3] === 'carts'){

            }
            else if($pathElements[3] === 'images'){

            }
            else if($pathElements[3] === 'categories'){
                include_once("CategoryController.php");
                $categoryController = new CategoryController();
                $categoryController->invoke($method,$parsed,$pathElements);
            }
            else if($pathElements[3] === 'auth'){
                include_once("AuthController.php");
                $authController = new AuthController();
                $authController->invoke($method,$parsed,$pathElements);
            }
        }
        else{
            echo "hello world!";
        }
    }
}
?>
<?php

class Controller{
    public function invoke($method, $parsed,$token){
        $path = $parsed['path'];
        $pathElements = explode('/', trim($path, '/'));
        if (isset($pathElements[3])) {
            if($pathElements[3] === 'users'){
                include_once("UserController.php");
                $userController = new UserController();
                $userController->invoke($method,$parsed,$pathElements,$token);  
            }
            else if($pathElements[3] === 'shoes'){
                // shoes?page=x&limit=y -> shoes/shoe_id  
                // shoes/category/cate_id?page=x&limit=y
                
                include_once("ShoeController.php");
                $shoeController = new ShoeController();
                $shoeController->invoke($method,$parsed,$pathElements,$token);                
            }
            else if($pathElements[3] === 'carts'){
                // carts/user_id -> get all data in cart of current user
                // carts/user_id -> post new data to cart
                // carts/user_id/item_id -> delete data from cart
                include_once("CartController.php");
                $cartController = new CartController();
                $cartController->invoke($method,$parsed,$pathElements,$token);
            }
            else if($pathElements[3] === 'variants'){
                //for variant products url
                include_once("VariantProductController.php");
                $variantController = new VariantController();
                $variantController->invoke($method,$parsed,$pathElements,$token);
            }
            else if($pathElements[3] === 'categories'){
                include_once("CategoryController.php");
                $categoryController = new CategoryController();
                $categoryController->invoke($method,$parsed,$pathElements,$token);
            }
            else if($pathElements[3] === 'auth'){
                include_once("AuthController.php");
                $authController = new AuthController();
                $authController->invoke($method,$parsed,$pathElements);
            }
            else if($pathElements[3] === 'comments'){
                include_once("CommentController.php");
                $commentController = new CommentController();
                $commentController->invoke($method,$parsed,$pathElements,$token);
            }
            else if($pathElements[3] === 'orders'){
                // GET Request
                //orders -> get all orders for admin
                // orders/order_id -> get order detail
                // orders/usr_id?query-lst -> users can get their order 
                // Post Request
                // orders{address, phone} -> add new order 
                include_once("OrderController.php");
                $orderController = new OrderController();
                $orderController->invoke($method,$parsed,$pathElements,$token);
            }
        }
        else{
            echo "hello world!";
        }
    }
}
?>
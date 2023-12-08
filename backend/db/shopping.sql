-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Dec 08, 2023 at 03:27 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopping`
--
CREATE DATABASE IF NOT EXISTS `shopping` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `shopping`;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE IF NOT EXISTS `address` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `address` text NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKda8tuywtf0gb6sedwk7la1pgi` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_line`
--

CREATE TABLE IF NOT EXISTS `cart_line` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `vp_id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` float NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `create_at` datetime(6) NOT NULL,
  `is_delete` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK8oljrxf47o5d2jrqo0gh0ds8r` (`user_id`),
  KEY `FKq0rwxb8smj169hnohpgjxb4en` (`vp_id`),
  KEY `FK7kou37876u74rhb2shc3ern2q` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_line`
--

INSERT INTO `cart_line` (`id`, `vp_id`, `quantity`, `total_price`, `user_id`, `order_id`, `create_at`, `is_delete`) VALUES
(1, 1, 1, 79.99, 1, 1, '2023-11-10 08:00:00.000000', 1),
(2, 2, 2, 259.98, 2, 2, '2023-11-12 09:30:00.000000', 1),
(3, 3, 1, 39.99, 3, 3, '2023-11-15 14:45:00.000000', 1),
(7, 2, 2, 259.98, 2, 18, '2023-11-19 02:50:40.000000', 1),
(8, 1, 1, 79.99, 2, 18, '2023-11-21 02:18:01.000000', 1),
(9, 2, 2, 259.98, 1, 16, '2023-11-22 23:52:16.000000', 1),
(10, 3, 1, 39.99, 2, 18, '2023-11-28 04:21:47.000000', 1),
(11, 37, 2, 4000000, 1, 16, '2023-12-04 03:08:04.000000', 1),
(12, 38, 4, 8000000, 1, 16, '2023-12-05 16:36:46.000000', 1),
(13, 36, 2, 44, 1, 16, '2023-12-05 16:40:35.000000', 1),
(14, 35, 2, 44, 1, 16, '2023-12-05 16:41:05.000000', 1),
(15, 78, 2, 8180000, 1, 17, '2023-12-08 02:51:37.000000', 1),
(16, 66, 4, 34760000, 2, 18, '2023-12-08 08:37:34.000000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Converse'),
(2, 'UltraBoost'),
(3, 'Sandals'),
(4, 'Running'),
(5, 'Giày Adidas');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(500) DEFAULT NULL,
  `shoe_id` bigint(20) NOT NULL,
  `star` float NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `create_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKforSender_id_idx` (`sender_id`),
  KEY `FKforShoe_id_idx` (`shoe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `content`, `shoe_id`, `star`, `sender_id`, `create_at`) VALUES
(1, 'Giày đẹp, chất lượng', 2, 4, 2, '2023-11-20'),
(2, 'Giày đẹp, chất lượng', 3, 5, 3, '2023-11-20'),
(3, 'Qua dep', 2, 3, 2, '2023-11-28'),
(4, '', 2, 0, 2, '2023-11-28'),
(5, 'Dep qua', 2, 2.5, 2, '2023-11-28');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE IF NOT EXISTS `image` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `address` text NOT NULL,
  `delivery_time` date DEFAULT NULL,
  `total_price` float NOT NULL,
  `create_at` date DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  `status` enum('waiting','confirm','on-delivery','done','delete') NOT NULL DEFAULT 'waiting',
  `phone_number` varchar(10) DEFAULT NULL,
  `payment_method` varchar(45) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_userID_order_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `address`, `delivery_time`, `total_price`, `create_at`, `user_id`, `status`, `phone_number`, `payment_method`, `notes`) VALUES
(1, '123 Main St, City A', '2023-11-10', 79.99, '2023-11-08', 2, 'done', '0995586082', 'MOMO', NULL),
(2, '456 Elm St, City B', '2023-11-12', 169.98, '2023-11-09', 2, 'done', '0995586082', 'Ship COD', NULL),
(3, '789 Oak St, City C', '2023-11-15', 39.99, '2023-11-10', 2, 'done', '0123456789', 'MOMO', NULL),
(4, 'Test address', NULL, 339.97, '2023-11-21', 2, 'delete', '0995586082', 'MOMO', NULL),
(5, 'Test address', NULL, 339.97, '2023-11-21', 2, 'on-delivery', '0995586082', 'Ship COD', NULL),
(6, 'Test address', NULL, 339.97, '2023-11-21', 2, 'delete', '0995586082', 'Ship COD', NULL),
(14, 'Đường Trần Khắc Chân, Quận 1, Hồ Chí Minh', NULL, 0, '2023-12-05', 1, 'waiting', '0868065438', 'momo', NULL),
(16, 'address', NULL, 12000300, '2023-12-05', 1, 'waiting', '0367706940', 'momo', NULL),
(17, 'thu duc', NULL, 8180000, '2023-12-08', 3, 'confirm', '0868065438', 'momo', NULL),
(18, 'thu duc', NULL, 34760400, '2023-12-08', 2, 'delete', '0868065438', 'momo', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'customer'),
(3, 'staff');

-- --------------------------------------------------------

--
-- Table structure for table `shoe`
--

CREATE TABLE IF NOT EXISTS `shoe` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `price` float NOT NULL,
  `create_at` date NOT NULL,
  `img_id` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shoe`
--

INSERT INTO `shoe` (`id`, `name`, `category_id`, `price`, `create_at`, `img_id`, `description`) VALUES
(1, 'Running Shoes', 1, 79.99, '2023-10-01', '', NULL),
(2, 'Leather Boots', 2, 129.99, '2023-09-15', '', NULL),
(3, 'Beach Sandals', 3, 39.99, '2023-11-05', '', NULL),
(10, 'Test post new shoe', 1, 22, '2023-11-22', '655e2b2daf18a.jpeg', NULL),
(11, 'GIÀY NMD_R1', 5, 3900000, '2023-12-01', '6569a472e3160.jpeg', 'Các nhà thám hiểm thành thị đã sẵn sàng lên đường. Đôi giày adidas NMD_R1 này là dành cho bạn. Giày mang lại cảm giác thoải mái vượt trội, để bạn có thể không ngừng tiến bước và đi theo tiếng gọi của trí tò mò. Tất cả là nhờ thân giày bằng vải dệt kim thích ứng và lớp đệm BOOST đàn hồi. Là phiên bản đột phá của mẫu giày chạy bộ thập niên 80, đôi giày này có diện mạo thanh thoát và đầy tốc độ, phù hợp với mọi outfit và mọi điểm đến.'),
(12, 'Adidas Stan Smith Fairway', 5, 895000, '2023-12-01', '6569aacc0dee4.jpeg', 'Fullbox Stan Smith. 2 ver Trắng Gót Xanh/ Full White. Thiết kế basic trend dài dài. Phù hợp: nam nữ, đi học, đi làm, hoạt động thể thao. Size: 36-44. Chất liệu: Da. Giao hàng toàn quốc. Bảo hành 3 tháng. Đổi trả dễ dàng. Streetwear, trẻ trung năng động.\nChi Tiết: \nSize: 36, 37, 38, 39, 40, 41, 42, 43, 44\nMàu sắc: Trắng\nMức Giá: 500k-999k\nThương hiệu: Adidas'),
(13, 'Test product', 1, 2000000, '2023-12-04', '656cca1d64209.png', 'test description'),
(14, 'Giày adidas Ultraboost Light ‘Dash Grey’ IE1758', 2, 5390000, '2023-12-08', '6572146730ecf.png', 'Giày chạy bộ adidas Ultraboost Light ‘Dash Grey’ IE1758 là một đôi giày chạy bộ nhẹ và linh hoạt được thiết kế để mang lại sự thoải mái, năng lượng và độ bền tối ưu. Đôi giày có phối màu xám nhạt tinh tế.\nPhần trên của giày được làm từ vải dệt Primeknit+ FORGED, mang lại sự thoải mái và hỗ trợ. Vải dệt mềm mại và thoáng khí giúp giữ cho chân mát mẻ và khô ráo, trong khi cấu trúc FORGED giúp mang lại sự vừa vặn và hỗ trợ.\nPhần đệm Light BOOST là một thế hệ mới của đệm BOOST, nhẹ hơn 30% so với BOOST thông thường. Light BOOST mang lại sự thoải mái và năng lượng tối ưu, giúp bạn chạy với tốc độ và hiệu suất cao hơn.\nGiày chạy bộ adidas Ultraboost Light ‘Dash Grey’ IE1758 là một lựa chọn tuyệt vời cho những người chạy bộ đang tìm kiếm một đôi giày nhẹ, thoải mái và mang lại hiệu suất cao. Đôi giày có thiết kế đẹp mắt và phối màu tinh tế, giúp bạn nổi bật trên đường chạy.'),
(15, 'Giày Adidas Ultraboost 21 ‘Grey’ Running Shoes GV7724', 2, 3290000, '2023-12-08', '6572167e75c10.jpeg', 'Giày Adidas Ultraboost 21 ‘Grey’ GV7724 là phiên bản mới nhất trong dòng sản phẩm Ultraboost của Adidas. Được thiết kế với sự kết hợp giữa công nghệ và phong cách, đôi giày này mang đến sự thoải mái và hiệu suất tối đa cho người mang.\nGiày Adidas Ultraboost 21 ‘Grey’ GV7724 có màu xám trung tính, tạo nên một diện mạo đơn giản và tinh tế. Được làm từ chất liệu Primeknit cao cấp, đôi giày này mang lại sự ôm sát vừa vặn và thoáng khí cho bàn chân. Đế giữa Boost của giày cung cấp đệm êm ái và đáp ứng linh hoạt, giúp tăng cường hiệu quả chạy bộ và giảm thiểu sự mệt mỏi.\nGiày Adidas Ultraboost 21 ‘Grey’ GV7724 còn có các tính năng tiên tiến như hệ thống cột cài bằng dây buộc và hệ thống Torsion hỗ trợ, giúp người mang dễ dàng điều chỉnh và cố định giày theo ý muốn. Đây là một lựa chọn tuyệt vời cho những người yêu thích thể thao và muốn có một đôi giày chất lượng cao và phong cách.\n'),
(16, 'Giày adidas UltraBoost Light ‘Grey Wonder Clay’ IE1745', 2, 5390000, '2023-12-08', '657217065b21c.png', 'Giày adidas UltraBoost Light ‘Grey Wonder Clay’ IE1745 là một đôi giày chạy bộ hiệu suất cao, được thiết kế để mang lại sự thoải mái và phản hồi năng lượng tuyệt vời cho người chạy. Đôi giày có trọng lượng nhẹ, với đế giữa Light BOOST, nhẹ hơn 30% so với đế giữa BOOST thông thường. Đế giữa Light BOOST vẫn mang lại độ êm ái và phản hồi năng lượng tuyệt vời, giúp người chạy di chuyển nhanh hơn và hiệu quả hơn.\nThân giày được làm bằng vải dệt adidas PRIMEKNIT+ FORGED, vừa vặn ôm chân và thoải mái. Vải dệt PRIMEKNIT+ FORGED cũng được làm từ vật liệu tái chế, giúp giảm thiểu tác động đến môi trường.\nĐế ngoài Continental™ Better Rubber mang lại độ bám tốt trên nhiều bề mặt khác nhau, trong mọi điều kiện thời tiết. Đế ngoài cũng được làm từ vật liệu tái chế, giúp giảm thiểu tác động đến môi trường.\nGiày adidas UltraBoost Light ‘Grey Wonder Clay’ IE1745 có thiết kế đơn giản nhưng thời trang, với tông màu xám chủ đạo, kết hợp với các điểm nhấn màu nâu đất và xanh neon. Đôi giày phù hợp cho nhiều loại trang phục khác nhau, từ quần áo thể thao đến quần áo thời trang.'),
(17, 'Giày adidas UltraBoost ‘Green Brown’ ID4167', 2, 4490000, '2023-12-08', '6572178c79b46.png', 'Giày adidas Ultra Boost ‘Green Brown’ ID4167 là một đôi giày chạy bộ được thiết kế cho cả nam và nữ, với tông màu chủ đạo là xanh lá cây và nâu. Đôi giày này có thân trên Primeknit nhẹ và thoáng khí, với các lớp phủ tổng hợp để tăng độ bền. Đế giữa Boost cung cấp khả năng đệm và phản hồi năng lượng tuyệt vời, trong khi đế ngoài Continental Grip mang lại độ bám trên nhiều bề mặt khác nhau\nGiày adidas Ultra Boost ‘Green Brown’ ID4167 là một lựa chọn tuyệt vời cho những người đang tìm kiếm một đôi giày chạy bộ nhẹ, bền và thoải mái. Đôi giày này phù hợp với nhiều mục đích sử dụng khác nhau, từ chạy bộ trên đường nhựa đến chạy bộ địa hình.\nNgoài ra, đôi giày này còn có một số điểm nổi bật khác như:\nThiết kế thời trang với tông màu xanh lá cây và nâu độc đáo.\nLưỡi gà liền thân giày giúp ngăn chặn bụi bẩn và các vật thể lạ xâm nhập vào bên trong.\nHệ thống dây giày thích ứng giúp ôm chân một cách thoải mái và chắc chắn.\nCác đường may tinh tế và chắc chắn, đảm bảo độ bền cho đôi giày.'),
(18, 'Giày adidas UltraBoost Clima U ‘Core Black Royal Blue’ GY0525', 2, 2890000, '2023-12-08', '65721a8f7595d.png', 'Giày adidas Ultra Boost Clima U ‘Core Black Royal Blue’ GY0525 là một đôi giày chạy bộ được thiết kế cho sự thoải mái cả ngày. Nó có phần trên Primeknit thoáng khí co giãn theo bàn chân của bạn và mang lại cảm giác vừa vặn, ôm sát. Đôi giày cũng có đế giữa Boost toàn chiều dài mang lại độ hồi phục năng lượng và đệm. Đế ngoài được làm bằng Cao su Continental cho độ bền và độ bám.\nNhìn chung: \nGiày adidas Ultra Boost Clima U ‘Core Black Royal Blue’ GY0525 là một lựa chọn tuyệt vời cho người chạy ở mọi cấp độ. Đây là một đôi giày đa năng có thể được sử dụng cho tập luyện hàng ngày, chạy đường dài và thậm chí là thi đấu.\nGiày adidas Ultra Boost Clima U ‘Core Black Royal Blue’ GY0525 là một đôi giày chạy bộ toàn diện tuyệt vời chắc chắn sẽ làm hài lòng người chạy ở mọi cấp độ\nGiày adidas Ultra Boost Clima U ‘Core Black Royal Blue’ GY0525 là một lựa chọn tuyệt vời cho người chạy đang tìm kiếm một đôi giày thoải mái, hiệu quả và bền bỉ.'),
(19, 'Giày Converse Chuck Taylor All-Star 70 Hi ‘Steel Gray’ 171847C', 1, 5290000, '2023-12-08', '65721b74ac1e7.png', 'Giày Converse Chuck Taylor All-Star 70 Hi ‘Steel Gray’ là một đôi giày thể thao sneaker cao cổ, được thiết kế bởi thương hiệu Converse. Đôi giày được ra mắt vào năm 2013 và nhanh chóng trở thành một trong những đôi giày thể thao phổ biến nhất của Converse.\nGiày Converse Chuck Taylor All-Star 70 Hi ‘Steel Gray’ có phần upper được làm từ chất liệu vải canvas, màu xám thép. Phần gót chân được trang trí bằng logo “Converse” màu trắng nổi bật. Phần đế của giày được làm từ cao su, có các đường rãnh để tạo độ bám tốt.\nGiày Converse Chuck Taylor All-Star 70 Hi ‘Steel Gray’ có thiết kế cổ điển và mang đậm phong cách đường phố. Đôi giày phù hợp với nhiều phong cách thời trang khác nhau, từ casual đến streetwear.\nNếu bạn là một người yêu thích phong cách đường phố hoặc đang tìm kiếm một đôi giày thể thao sneaker đơn giản, nhưng vẫn mang đậm cá tính, thì Giày Converse Chuck Taylor All-Star 70 Hi ‘Steel Gray’ là một lựa chọn đáng cân nhắc.'),
(20, 'Giày Converse Carhartt WIP x Chuck 70 High ‘Hamilton Brown’ 169220C', 1, 8690000, '2023-12-08', '65721c10aaf6b.png', 'Giày Converse Carhartt WIP x Chuck 70 High ‘Hamilton Brown’ là một đôi giày thể thao được thiết kế bởi Carhartt WIP, một thương hiệu thời trang đường phố có trụ sở tại London. Đôi giày được ra mắt vào năm 2023 và nhanh chóng trở thành một trong những đôi giày Converse được yêu thích nhất mọi thời đại.\nConverse Carhartt WIP x Chuck 70 High ‘Hamilton Brown’ có thiết kế mang tính biểu tượng của Chuck 70, với phần upper bằng da màu nâu và phần midsole bằng cao su trắng. Đôi giày được trang trí với các chi tiết màu đen, bao gồm logo Carhartt WIP ở lưỡi gà và gót chân.\nConverse Carhartt WIP x Chuck 70 High ‘Hamilton Brown’ là một đôi giày thể thao tuyệt vời, mang lại sự thoải mái, phong cách và thời trang cho người dùng. Nếu bạn đang tìm kiếm một đôi giày thể thao mới, thì Converse Carhartt WIP x Chuck 70 High ‘Hamilton Brown’ là một lựa chọn tuyệt vời dành cho bạn.'),
(21, 'Giày Converse Golf Le Fleur x Gianno Ox ‘Parfait Pink’ 168179C', 1, 10709000, '2023-12-08', '65721c694d7dd.png', ''),
(22, 'Giày Converse Run Star Hike High ‘Triple White’ 170777C', 1, 4790000, '2023-12-08', '65721cf1e19e0.jpeg', 'Mô tả:\n– Đây là một đôi giày thể thao cao cổ, thuộc dòng sản phẩm Converse Run Star Hike.\n– Màu sắc chủ đạo là “Triple White”, tức là màu trắng tinh khôi trên toàn bộ thiết kế giày.\n– Giày có phong cách thể thao hiện đại, kết hợp với đặc trưng của dòng Run Star Hike, mang lại vẻ ngoại hình mạnh mẽ và phong cách độc đáo.\nĐặc điểm:\n– Đế giày được thiết kế đặc biệt với kích thước lớn, mang lại sự ấn tượng và độ bám tốt.\n– Logo Converse đặt trên mắt giày và gót.\n– Lớp lót và đệm trong giày được thiết kế để mang lại sự thoải mái khi sử dụng.\nSản phẩm này thường là một lựa chọn phù hợp cho những người yêu thích phong cách thể thao hiện đại và muốn tạo điểm nhấn sáng trong trang phục.'),
(23, 'Giày Converse Chuck 70 High ‘Utility Green’', 1, 3590000, '2023-12-08', '65721e1458c06.png', '“Converse Chuck 70 High Utility Green’” là một phiên bản của giày Converse Chuck 70 cao cổ với màu sắc “Utility Green”. Đây là một sản phẩm của thương hiệu giày nổi tiếng Converse, nằm trong dòng Chuck 70 – một phiên bản nâng cấp từ phiên bản cổ điển Chuck Taylor.\nMô tả:\n– Đây là một đôi giày cao cổ, thiết kế dựa trên mẫu giày Chuck Taylor truyền thống.\n– Màu sắc chủ đạo là “Utility Green”, một sắc xanh thời trang và trẻ trung.\n– Giày có kiểu dáng và chi tiết được cải tiến so với phiên bản gốc, mang đến vẻ ngoại hình hoàn thiện hơn và chất lượng tốt hơn.\nĐặc điểm:\n– Converse Chuck 70 là phiên bản nâng cấp của giày Chuck Taylor, với các cải tiến về chất liệu và thiết kế để mang lại sự thoải mái và bền bỉ hơn.\n– Đế giày được làm bằng cao su chất lượng, cung cấp độ bám tốt và độ bền cao.\n– Giày có thiết kế lưỡi gà bản to, logo Converse đặt trên mắt giày và logo Chuck Taylor All Star dập nổi ở gót.'),
(24, 'Giày Converse Chuck 70 High ‘Court Green’', 1, 4090000, '2023-12-08', '65721e897afe8.png', 'Converse Chuck 70 High ‘Court Green’ là một phiên bản của dòng giày Converse Chuck 70 cao cổ với màu sắc chủ đạo là màu xanh lá cây, tạo nên vẻ ngoại hình tươi mới và phong cách.\n\nMô tả về Converse Chuck 70 High ‘Court Green’  có thể bao gồm các đặc điểm sau:\n\n1. **Kiểu dáng:** Giày Converse Chuck 70 thường có kiểu dáng cao cổ và mang vẻ đẹp cổ điển, phù hợp cho cả các hoạt động thể thao và thời trang hàng ngày.\n\n2. **Màu sắc:** ‘Court Green’ thường chỉ ra màu xanh lá cây, tạo nên vẻ ngoại hình tươi mới và nổi bật.\n\n3. **Chất liệu:** Phần trên của giày thường được làm từ vải canvas chất lượng cao, mang lại sự thoải mái và độ bền.\n\n4. **Logo Converse:** Logo Converse All Star thường xuất hiện trên mũi giày và logo Converse Chuck Taylor All Star thường xuất hiện ở đế giày.\n\n5. **Đế cao su:** Giày Converse Chuck 70 thường được thiết kế với đế cao su cao cấp, mang lại độ bám tốt và đáp ứng tốt trên nhiều bề mặt.\n\n6. **Phong cách tươi mới:** Màu sắc tươi sáng và thiết kế cổ điển của giày tạo nên vẻ ngoại hình phóng khoáng và cá tính.'),
(25, 'new product', 1, 5000000, '2023-12-08', '65728e2b44413.png', 'new product');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `fullname`, `username`, `password`, `phone`, `dob`, `gender`) VALUES
(1, 'johnadmin@example.com', 'John Doe', 'admin', 'admin', '0367658093', '1990-05-15', 'M'),
(2, 'ntt@email.com', 'NTTT', 'user2', 'password456', '0367230930', '2002-09-11', 'F'),
(3, 'alice@example.com', 'Alice Johnson', 'user3', 'password789', '555123456', '1995-12-10', 'F'),
(6, NULL, 'Thanh Tuan', 'user4', '12345', '0367760930', '2002-09-11', 'F'),
(7, NULL, 'Thanh Tuan', 'user5', '12345', '0367760930', '2002-09-11', 'F'),
(9, NULL, 'Thanh Tuan', 'user6', '23456', '0367760930', '2002-09-11', 'F'),
(10, NULL, 'Thanh Tuan Nguyen', 'username12', '12345', '0367760930', '2002-09-11', 'M');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE IF NOT EXISTS `user_role` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKa68196081fvovjhkek5m97n3y` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`user_id`, `role_id`) VALUES
(1, 1),
(2, 2),
(3, 2),
(6, 2),
(7, 2),
(9, 2),
(10, 2);

-- --------------------------------------------------------

--
-- Table structure for table `variant_product`
--

CREATE TABLE IF NOT EXISTS `variant_product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `color` varchar(50) NOT NULL,
  `model` varchar(100) NOT NULL,
  `size` varchar(50) NOT NULL,
  `in_stock` int(11) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK19o7w496ujmendl91f56cu00f` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `variant_product`
--

INSERT INTO `variant_product` (`id`, `color`, `model`, `size`, `in_stock`, `product_id`) VALUES
(1, 'Black', 'Nike Air Max', 'US 10', 0, 1),
(2, 'Brown', 'Timberland Premium', 'US 9', 0, 2),
(3, 'Blue', 'Adidas Adilette', 'US 8', 0, 3),
(4, 'White', 'Adidas Adilette', 'US 8', 0, 3),
(33, 'white', '2023', 'US4', 0, 10),
(34, 'black', '2023', 'US4', 0, 10),
(35, 'white', '2022', 'US3', 100, 10),
(36, 'black', '2022', 'US3', 100, 10),
(37, 'black', '2023', '36', 100, 13),
(38, 'black', '2023', '37', 100, 13),
(39, 'black', '2023', '39', 100, 14),
(40, 'black', '2023', '40', 100, 14),
(41, 'black', '2023', '41', 100, 14),
(42, 'black', '2023', '42', 20, 14),
(43, 'black', '2023', '37', 100, 15),
(44, 'black', '2023', '38', 100, 15),
(45, 'black', '2023', '40', 100, 15),
(46, 'black', '2023', '41', 100, 15),
(47, 'black', '2023', '40', 100, 16),
(48, 'black', '2023', '36', 0, 16),
(49, 'black', '2023', '37', 100, 16),
(50, 'black', '2023', '38', 60, 16),
(51, 'black', '2023', '36', 100, 17),
(52, 'black', '2023', '37', 100, 17),
(53, 'black', '2023', '38', 0, 17),
(54, 'black', '2023', '40', 100, 17),
(55, 'black', '2023', '41', 100, 17),
(56, 'black', '2023', '42', 100, 17),
(57, 'black', '2023', '39', 100, 18),
(58, 'black', '2023', '40', 90, 18),
(59, 'black', '2023', '41', 85, 18),
(60, 'black', '2023', '36', 100, 19),
(61, 'black', '2023', '37', 100, 19),
(62, 'black', '2023', '38', 100, 19),
(63, 'black', '2023', '39', 100, 19),
(64, 'black', '2023', '40', 100, 19),
(65, 'black', '2023', '39', 100, 20),
(66, 'black', '2023', '40', 41, 20),
(67, 'black', '2023', '41', 42, 20),
(68, 'black', '2023', '38', 10, 21),
(69, 'black', '2023', '39', 10, 21),
(70, 'black', '2023', '40', 10, 21),
(71, 'black', '2023', '41', 10, 21),
(72, 'black', '2023', '40', 100, 22),
(73, 'black', '2023', '39', 123, 22),
(74, 'black', '2023', '41', 90, 22),
(75, 'black', '2023', '42', 90, 22),
(76, 'black', '2023', '39', 100, 23),
(77, 'black', '2023', '40', 100, 23),
(78, 'black', '2023', '39', 100, 24),
(79, 'black', '2023', '40', 30, 24),
(80, 'black', '2023', '41', 40, 24),
(81, 'black', '2023', '42', 20, 24),
(82, 'black', '2023', '39', 100, 25),
(83, 'black', '2023', '40', 100, 25);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `FKda8tuywtf0gb6sedwk7la1pgi` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `cart_line`
--
ALTER TABLE `cart_line`
  ADD CONSTRAINT `FK7kou37876u74rhb2shc3ern2q` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `FK8oljrxf47o5d2jrqo0gh0ds8r` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKq0rwxb8smj169hnohpgjxb4en` FOREIGN KEY (`vp_id`) REFERENCES `variant_product` (`id`);

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FKforSender_id` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKforShoe_id` FOREIGN KEY (`shoe_id`) REFERENCES `shoe` (`id`);

--
-- Constraints for table `shoe`
--
ALTER TABLE `shoe`
  ADD CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `FK859n2jvi8ivhui0rl0esws6o` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKa68196081fvovjhkek5m97n3y` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

--
-- Constraints for table `variant_product`
--
ALTER TABLE `variant_product`
  ADD CONSTRAINT `FK19o7w496ujmendl91f56cu00f` FOREIGN KEY (`product_id`) REFERENCES `shoe` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

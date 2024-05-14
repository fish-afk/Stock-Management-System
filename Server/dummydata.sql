-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.31 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- --------------------------------------------------------

-- This is some data to help seed the database with something for testing purposes

-- Dumping data for table stockmanagementsystem_001356993.roles: ~2 rows (approximately)
INSERT INTO `roles` (`role_id`, `role_name`) VALUES
	(1, 'admin'),
	(2, 'warehouse-operator'),
	(3, 'stakeholder');
	
-- Dumping data for table stockmanagementsystem_001356993.categories: ~7 rows (approximately)
INSERT INTO `categories` (`category_id`, `category_name`, `category_description`, `category_image_name`) VALUES
	(1, 'Electronics', 'Electronics products', 'electronics.jpg'),
	(2, 'Clothing', 'Apparel products', 'clothing.jpg'),
	(3, 'Books', 'Books and literature', 'books.jpg'),
	(4, 'Home Decor', 'Decorative items for home', 'homedecor.jpg'),
	(5, 'Crisps and processed foods', 'category for processed foods', 'electronics.jpg'),
	(6, 'Drinks and Beverages', 'Category for drinks', 'clothing.jpg');

-- Dumping data for table stockmanagementsystem_001356993.customers: ~0 rows (approximately)
INSERT INTO `customers` (`customer_id`, `customer_name`, `email`, `phone`) VALUES
	(1, 'John Doe', 'john@example.com', '1234567890'),
	(2, 'Alice Smith', 'alice@example.com', '0987654321'),
	(3, 'Bob Johnson', 'bob@example.com', '9876543210'),
	(4, 'Emma Davis', 'emma@example.com', '0123456789'),
	(5, 'Michael Wilson', 'michael@example.com', '5555555555'),
	(6, 'Sophia Martinez', 'sophia@example.com', '4444444444'),
	(7, 'James Taylor', 'james@example.com', '7777777777');


-- Dumping data for table stockmanagementsystem_001356993.warehouses: ~4 rows (approximately)
INSERT INTO `warehouses` (`warehouse_id`, `warehouse_name`, `warehouse_description`, `image_name`, `max_storage_capacity`, `warehouse_location`) VALUES
	(1, 'Warehouse A', 'Large warehouse for storing various goods', 'warehouse_a_image.jpg', 10000, '123 Main St, Anytown, USA'),
	(2, 'Warehouse B', 'Temperature-controlled warehouse for perishable items', NULL, 50001, '456 Elm St, Othertown, USA'),
	(3, 'Warehouse C', 'Small warehouse specializing in electronics storage', 'warehouse_c_image.jpg', 2000, '789 Oak St, Anycity, USA'),
	(4, 'Warehouse D', 'Primary storage facility', 'warehouse1.jpg', 1000, 'New York');


-- Dumping data for table stockmanagementsystem_001356993.suppliers: ~3 rows (approximately)
INSERT INTO `suppliers` (`supplier_id`, `supplier_name`, `email`, `phone`) VALUES
	(1, 'ABC Electronics', 'abc@example.com', '1234567890'),
	(2, 'Fashion House', 'fashion@example.com', '0987654321'),
	(3, 'Book Emporium', 'books@example.com', '9876543210'),
	(4, 'Home Decor Co.', 'homedecor@example.com', '0123456789'),
	(5, 'Tech Supplies', 'tech@example.com', '5555555555'),
	(6, 'Clothing Distributors', 'clothing@example.com', '4444444444'),
	(7, 'Book World', 'bookworld@example.com', '7777777777'),
	(8, 'Home Essentials', 'home@example.com', '6666666666');

-- Dumping data for table stockmanagementsystem_001356993.users: ~9 rows (approximately)
INSERT INTO `users` (`username`, `password`, `first_name`, `auth_refresh_token`, `last_name`, `email`, `role_id`, `phone`) VALUES
	('admin', '$2b$10$dMac45Uq0XVp.5UP4t50meqN8oXSmg6NV3hIzHOvtDBSSb2gYGRxG', 'john', NULL, 'doe', 'john3@exampl.com', 1, NULL),
	('john_doe', '$2b$10$l.ZOB6h5F0YjBFI9qhXmSOD0W/zY1prFf8uVJnfFtgkz8QR4Ypccu', 'SHIHAB', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiZXhwIjoxNzE3ODM2NzI4OTk5LCJyb2xlX2lkIjoxLCJpYXQiOjE3MTUxNTgzMjl9.VQ5hxLddZPlv_Bi9QHLJVC6oqBJ-SDtKpDQcdLpqd8E', 'MIRZA', 'mirzashihab2@outlook.com', 1, '0968329636'),
	('john_doe_st', '$2b$10$dMac45Uq0XVp.5UP4t50meqN8oXSmg6NV3hIzHOvtDBSSb2gYGRxG', 'john', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lX3N0IiwiZXhwIjoxNzE4MDIzNzMwNzY2LCJyb2xlX2lkIjozLCJpYXQiOjE3MTUzNDUzMzB9.AF56AOaoWAak-cJjMKnKjkzkwSc_G5cS3QB2Syi3wpM', 'doe', 'john3@exampl.com', 3, NULL),
	('john_doe_wh', '$2b$10$zkpub8vD4N9UCuyAHIdMq.xOLviKQRTIJ4XjtcIcdFA1n2hudgWma', 'S345345', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lX3doIiwiZXhwIjoxNzE4MDIxOTk0ODIzLCJyb2xlX2lkIjoyLCJpYXQiOjE3MTUzNDM1OTR9.DrN1rhtG9MebDQu7Rtir0SU5EMY6TlVneP2eyMvktd0', 'MIRZA', 'mirzashihab2@outlook.com', 2, '0968329636'),
	('user1', '$2b$10$dMac45Uq0XVp.5UP4t50meqN8oXSmg6NV3hIzHOvtDBSSb2gYGRxG', 'john', NULL, 'doe', 'john3@exampl.com', 3, NULL),
	('user2', '$2b$10$dMac45Uq0XVp.5UP4t50meqN8oXSmg6NV3hIzHOvtDBSSb2gYGRxG', 'john', NULL, 'doe', 'john3@exampl.com', 3, NULL),
	('user3', '$2b$10$dMac45Uq0XVp.5UP4t50meqN8oXSmg6NV3hIzHOvtDBSSb2gYGRxG', 'john', NULL, 'doe', 'john3@exampl.com', 3, NULL),
	('user4', '$2b$10$dMac45Uq0XVp.5UP4t50meqN8oXSmg6NV3hIzHOvtDBSSb2gYGRxG', 'john', NULL, 'doe', 'john3@exampl.com', 3, NULL),
	('user5', '$2b$10$dMac45Uq0XVp.5UP4t50meqN8oXSmg6NV3hIzHOvtDBSSb2gYGRxG', 'john', NULL, 'doe', 'john3@exampl.com', 3, NULL);


INSERT INTO `products` (`product_id`, `product_name`, `description`, `unit_price`, `quantity_in_stock`, `category_id`, `product_image`, `warehouse_id`, `last_edited_by`) VALUES (1, 'Laptop', 'High-performance laptop', 800.00, 50, 1, 'laptop.jpg', 1, 'admin');
INSERT INTO `products` (`product_id`, `product_name`, `description`, `unit_price`, `quantity_in_stock`, `category_id`, `product_image`, `warehouse_id`, `last_edited_by`) VALUES (2, 'Smartphone', 'Latest smartphone model', 700.00, 70, 1, 'smartphone.jpg', 1, 'admin');
INSERT INTO `products` (`product_id`, `product_name`, `description`, `unit_price`, `quantity_in_stock`, `category_id`, `product_image`, `warehouse_id`, `last_edited_by`) VALUES (3, 'Desktop Computer', 'Powerful desktop computer', 1200.00, 40, 1, 'desktop.jpg', 1, 'admin');
INSERT INTO `products` (`product_id`, `product_name`, `description`, `unit_price`, `quantity_in_stock`, `category_id`, `product_image`, `warehouse_id`, `last_edited_by`) VALUES (4, 'T-Shirt', 'Casual cotton t-shirt', 20.00, 100, 2, 'tshirt.jpg', 2, 'admin');
INSERT INTO `products` (`product_id`, `product_name`, `description`, `unit_price`, `quantity_in_stock`, `category_id`, `product_image`, `warehouse_id`, `last_edited_by`) VALUES (5, 'Jeans', 'Denim jeans', 30.00, 80, 2, 'jeans.jpg', 2, 'admin');
INSERT INTO `products` (`product_id`, `product_name`, `description`, `unit_price`, `quantity_in_stock`, `category_id`, `product_image`, `warehouse_id`, `last_edited_by`) VALUES (6, 'Dress', 'Elegant dress', 50.00, 60, 2, 'dress.jpg', 2, 'admin');
INSERT INTO `products` (`product_id`, `product_name`, `description`, `unit_price`, `quantity_in_stock`, `category_id`, `product_image`, `warehouse_id`, `last_edited_by`) VALUES (7, 'Novel', 'Best-selling novel', 10.00, 200, 3, 'novel.jpg', 3, 'admin');
INSERT INTO `products` (`product_id`, `product_name`, `description`, `unit_price`, `quantity_in_stock`, `category_id`, `product_image`, `warehouse_id`, `last_edited_by`) VALUES (8, 'Cookbook', 'Collection of recipes', 25.00, 120, 3, 'cookbook.jpg', 3, 'admin');
INSERT INTO `products` (`product_id`, `product_name`, `description`, `unit_price`, `quantity_in_stock`, `category_id`, `product_image`, `warehouse_id`, `last_edited_by`) VALUES (9, 'Candle Holder', 'Decorative candle holder', 15.00, 150, 4, 'candleholder.jpg', 4, 'admin');
INSERT INTO `products` (`product_id`, `product_name`, `description`, `unit_price`, `quantity_in_stock`, `category_id`, `product_image`, `warehouse_id`, `last_edited_by`) VALUES (10, 'Vase', 'Decorative vase', 35.00, 90, 4, 'vase.jpg', 4, 'admin');
INSERT INTO `products` (`product_id`, `product_name`, `description`, `unit_price`, `quantity_in_stock`, `category_id`, `product_image`, `warehouse_id`, `last_edited_by`) VALUES (11, 'Cola drink', 'Fizzy drink', 12.00, 12, 6, NULL, 2, 'john_doe_wh');
INSERT INTO `products` (`product_id`, `product_name`, `description`, `unit_price`, `quantity_in_stock`, `category_id`, `product_image`, `warehouse_id`, `last_edited_by`) VALUES (12, 'Lays crisps', 'Food', 19.00, 200, 5, NULL, 4, 'john_doe_wh');


-- Dumping data for table stockmanagementsystem_001356993.purchases: ~0 rows (approximately)
INSERT INTO `purchases` (`purchase_id`, `supplier_id`, `product_id`, `purchase_date`, `quantity`, `unit_price`, `proof_of_purchase_image`) VALUES
	(1, 1, 1, '2024-05-01', 20, 500.00, 'purchase_proof1.jpg'),
	(2, 2, 2, '2024-05-02', 15, 300.00, 'purchase_proof2.jpg'),
	(3, 3, 3, '2024-05-03', 30, 20.00, 'purchase_proof3.jpg'),
	(4, 4, 4, '2024-05-04', 25, 50.00, 'purchase_proof4.jpg'),
	(5, 5, 5, '2024-05-05', 10, 100.00, 'purchase_proof5.jpg'),
	(6, 6, 6, '2024-05-06', 35, 150.00, 'purchase_proof6.jpg'),
	(7, 7, 7, '2024-05-07', 40, 25.00, 'purchase_proof7.jpg'),
	(8, 8, 8, '2024-05-08', 50, 30.00, 'purchase_proof8.jpg'),
	(9, 1, 9, '2024-05-09', 20, 200.00, 'purchase_proof9.jpg'),
	(10, 2, 10, '2024-05-10', 15, 75.00, 'purchase_proof10.jpg'),
	(11, 3, 1, '2024-05-11', 30, 400.00, 'purchase_proof11.jpg'),
	(12, 4, 2, '2024-05-12', 25, 250.00, 'purchase_proof12.jpg'),
	(13, 5, 3, '2024-05-13', 10, 30.00, 'purchase_proof13.jpg'),
	(14, 6, 4, '2024-05-14', 35, 150.00, 'purchase_proof14.jpg'),
	(15, 7, 5, '2024-05-15', 40, 200.00, 'purchase_proof15.jpg');



-- Dumping data for table stockmanagementsystem_001356993.sales: ~0 rows (approximately)
INSERT INTO `sales` (`sale_id`, `sale_date`, `customer_id`, `product_id`, `quantity`, `unit_price`, `proof_of_sale_image`) VALUES
	(1, '2024-05-01', 1, 1, 5, 1000.00, 'sale_proof1.jpg'),
	(2, '2024-05-02', 2, 2, 10, 25.00, 'sale_proof2.jpg'),
	(3, '2024-05-03', 3, 3, 15, 15.00, 'sale_proof3.jpg'),
	(4, '2024-05-04', 4, 4, 20, 20.00, 'sale_proof4.jpg'),
	(5, '2024-05-05', 5, 5, 25, 800.00, 'sale_proof5.jpg'),
	(6, '2024-05-06', 6, 6, 30, 40.00, 'sale_proof6.jpg'),
	(7, '2024-05-07', 7, 7, 35, 30.00, 'sale_proof7.jpg'),
	(8, '2024-05-08', 1, 8, 40, 45.00, 'sale_proof8.jpg'),
	(9, '2024-05-09', 2, 9, 45, 500.00, 'sale_proof9.jpg'),
	(10, '2024-05-10', 3, 10, 50, 70.00, 'sale_proof10.jpg');



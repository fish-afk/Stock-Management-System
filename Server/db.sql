CREATE DATABASE StockManagementSystem_001356993;

USE StockManagementSystem_001356993;


CREATE TABLE IF NOT EXISTS `Categories` (
  `category_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255),
  `category_description` TEXT NULL,
  `category_image_name` TEXT NULL
);

CREATE TABLE IF NOT EXISTS `Suppliers` (
  `supplier_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `supplier_name` VARCHAR(255),
  `email` VARCHAR(255),
  `phone` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `Customers` (
  `customer_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(255),
  `email` VARCHAR(255),
  `phone` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `Users` (
  `username` VARCHAR(255) PRIMARY KEY NOT NULL,
  `password` VARCHAR(255),
  `first_name` VARCHAR(255),
  `auth_refresh_token` TEXT,
  `last_name` VARCHAR(255),
  `email` VARCHAR(255),
  `role_id` INT
);

CREATE TABLE IF NOT EXISTS `Roles` (
  `role_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS `Warehouses` (
  `warehouse_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `warehouse_name` VARCHAR(255),
  `warehouse_description` TEXT,
  `image_url` TEXT,
  `max_storage_capacity` INT,
  `current_storage_amount` INT
);

CREATE TABLE IF NOT EXISTS `Purchases` (
  `purchase_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `supplier_id` INT,
  `product_id` INT,
  `purchase_date` DATE,
  `quantity` INT,
  `unit_price` DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS `Products` (
  `product_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(255),
  `description` TEXT,
  `unit_price` DECIMAL(10,2),
  `quantity_in_stock` INT,
  `category_id` INT,
  `product_image` TEXT,
  `warehouse_id` INT,
  `last_edited_by` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `Sales` (
  `sale_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `sale_date` DATE,
  `customer_id` INT,
  `product_id` INT,
  `quantity` INT,
  `unit_price` DECIMAL(10,2),
  `total_price` DECIMAL(10,2),
  `order_completed` BOOLEAN
);

ALTER TABLE `Users` ADD FOREIGN KEY (`role_id`) REFERENCES `Roles` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Purchases` ADD FOREIGN KEY (`supplier_id`) REFERENCES `Suppliers` (`supplier_id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Purchases` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`product_id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Products` ADD FOREIGN KEY (`category_id`) REFERENCES `Categories` (`category_id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Products` ADD FOREIGN KEY (`warehouse_id`) REFERENCES `Warehouses` (`warehouse_id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Products` ADD FOREIGN KEY (`last_edited_by`) REFERENCES `Users` (`username`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Sales` ADD FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Sales` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`product_id`) ON DELETE SET NULL ON UPDATE CASCADE;

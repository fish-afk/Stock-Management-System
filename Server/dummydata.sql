INSERT INTO `categories` (`category_id`, `category_name`, `category_description`, `category_image_name`) VALUES (1, 'Crisps', 'Category for electronic products', 'electronics.jpg');
INSERT INTO `categories` (`category_id`, `category_name`, `category_description`, `category_image_name`) VALUES (2, 'Drinks and Beverages', 'Category for clothing and apparel', 'clothing.jpg');
INSERT INTO `categories` (`category_id`, `category_name`, `category_description`, `category_image_name`) VALUES (3, 'Cosmetics', 'Category for home and kitchen products', 'home_kitchen.jpg');
INSERT INTO `categories` (`category_id`, `category_name`, `category_description`, `category_image_name`) VALUES (4, 'Sationery', 'Category for books and reading materials', 'books.jpg');
INSERT INTO `categories` (`category_id`, `category_name`, `category_description`, `category_image_name`) VALUES (5, 'Sationery', 'Category for books and reading materials', 'books.jpg');
INSERT INTO `categories` (`category_id`, `category_name`, `category_description`, `category_image_name`) VALUES (6, 'Sationery', 'Category for books and reading materials', 'books.jpg');
INSERT INTO `categories` (`category_id`, `category_name`, `category_description`, `category_image_name`) VALUES (7, 'Sationery', 'Category for books and reading materials', 'books.jpg');

INSERT INTO `roles` (`role_id`, `role_name`) VALUES (1, 'admin');
INSERT INTO `roles` (`role_id`, `role_name`) VALUES (2, 'warehouse-operator');
INSERT INTO `roles` (`role_id`, `role_name`) VALUES (3, 'stakeholder');


INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `email`, `role_id`, `auth_refresh_token`) VALUES ('john_doe', '$2b$10$zkpub8vD4N9UCuyAHIdMq.xOLviKQRTIJ4XjtcIcdFA1n2hudgWma', 'John', 'Doe', 'john@example.com', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiZXhwIjoxNzEzNjE4ODQ2Mzc5LCJyb2xlX2lkIjoxLCJpYXQiOjE3MTA5NDA0NDZ9.VD4ZpUjNobb_0jF0bi6Z2sIUs07XwvRhlx4yTjz4KIA');
INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `email`, `role_id`, `auth_refresh_token`) VALUES ('john_doe_wh', '$2b$10$zkpub8vD4N9UCuyAHIdMq.xOLviKQRTIJ4XjtcIcdFA1n2hudgWma', 'John', 'Doe', 'john2@example.com', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lX3doIiwiZXhwIjoxNzEzMjcwMTMzNjI0LCJyb2xlX2lkIjoyLCJpYXQiOjE3MTA1OTE3MzN9.kMLt-Uwyip4znTyjpD2iQqhtHPZDv9kELxlbBK_n-vg');
INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `email`, `role_id`, `auth_refresh_token`) VALUES ('4', '$2b$10$dMac45Uq0XVp.5UP4t50meqN8oXSmg6NV3hIzHOvtDBSSb2gYGRxG', 'john', 'doe', 'john3@exampl.com', 3, NULL);
INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `email`, `role_id`, `auth_refresh_token`) VALUES ('8', '$2b$10$dMac45Uq0XVp.5UP4t50meqN8oXSmg6NV3hIzHOvtDBSSb2gYGRxG', 'john', 'doe', 'john3@exampl.com', 3, NULL);
INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `email`, `role_id`, `auth_refresh_token`) VALUES ('9', '$2b$10$dMac45Uq0XVp.5UP4t50meqN8oXSmg6NV3hIzHOvtDBSSb2gYGRxG', 'john', 'doe', 'john3@exampl.com', 3, NULL);
INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `email`, `role_id`, `auth_refresh_token`) VALUES ('asd', '$2b$10$dMac45Uq0XVp.5UP4t50meqN8oXSmg6NV3hIzHOvtDBSSb2gYGRxG', 'john', 'doe', 'john3@exampl.com', 3, NULL);
INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `email`, `role_id`, `auth_refresh_token`) VALUES ('asdsad', '$2b$10$dMac45Uq0XVp.5UP4t50meqN8oXSmg6NV3hIzHOvtDBSSb2gYGRxG', 'john', 'doe', 'john3@exampl.com', 3, NULL);
INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `email`, `role_id`, `auth_refresh_token`) VALUES ('john_doe_st', '$2b$10$dMac45Uq0XVp.5UP4t50meqN8oXSmg6NV3hIzHOvtDBSSb2gYGRxG', 'john', 'doe', 'john3@exampl.com', 3, NULL);
INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `email`, `role_id`, `auth_refresh_token`) VALUES ('s', '$2b$10$dMac45Uq0XVp.5UP4t50meqN8oXSmg6NV3hIzHOvtDBSSb2gYGRxG', 'john', 'doe', 'john3@exampl.com', 3, NULL);

-- ------------------------------------------------------
-- Estrutura do Banco de Dados: bancoDeDados
-- ------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `bancoDeDados` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bancoDeDados`;

--
-- Tabela `t_users`
--

DROP TABLE IF EXISTS `t_users`;
CREATE TABLE `t_users` (
  `t_id` int NOT NULL AUTO_INCREMENT,
  `t_username` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `t_name` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `t_levelaccess` int NOT NULL,
  `t_password` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `t_status` int NOT NULL,
  `t_datecreated` date NOT NULL,
  `t_delete` int NOT NULL,
  PRIMARY KEY (`t_id`),
  UNIQUE KEY `t_username` (`t_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tabela `t_tokenuser`
--

DROP TABLE IF EXISTS `t_tokenuser`;
CREATE TABLE `t_tokenuser` (
  `t_id` int NOT NULL AUTO_INCREMENT,
  `t_user` int NOT NULL,
  `t_token` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `t_datecreated` datetime NOT NULL,
  `t_lastaccess` datetime DEFAULT NULL,
  `t_status` int NOT NULL,
  `t_delete` int NOT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tabela `t_schools`
--

DROP TABLE IF EXISTS `t_schools`;
CREATE TABLE `t_schools` (
  `t_id` int NOT NULL AUTO_INCREMENT,
  `t_name` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `t_shortname` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `t_status` int NOT NULL,
  `t_students` int NOT NULL,
  `t_converter` float NOT NULL,
  `t_delete` int NOT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tabela `t_provider`
--

DROP TABLE IF EXISTS `t_provider`;
CREATE TABLE `t_provider` (
  `t_id` int NOT NULL AUTO_INCREMENT,
  `t_name` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `t_status` int NOT NULL,
  `t_delete` int NOT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tabela `t_products`
--

DROP TABLE IF EXISTS `t_products`;
CREATE TABLE `t_products` (
  `t_id` int NOT NULL AUTO_INCREMENT,
  `t_name` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `t_name2` varchar(1024) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `t_converter` float NOT NULL,
  `t_status` int NOT NULL,
  `t_delete` int NOT NULL,
  `t_um` varchar(8) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tabela `t_order`
--

DROP TABLE IF EXISTS `t_order`;
CREATE TABLE `t_order` (
  `t_id` int NOT NULL AUTO_INCREMENT,
  `t_pedido` int NOT NULL,
  `t_provider` int NOT NULL,
  `t_providername` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `t_datedeliver` date DEFAULT NULL,
  `t_date` datetime NOT NULL,
  `t_item` int NOT NULL,
  `t_product` int NOT NULL,
  `t_productname` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `t_productname2` varchar(1024) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `t_school` int NOT NULL,
  `t_quantity` float NOT NULL,
  `t_usercreated` int NOT NULL,
  `t_status` int NOT NULL,
  `t_delete` int NOT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tabela `t_main`
--

DROP TABLE IF EXISTS `t_main`;
CREATE TABLE `t_main` (
  `t_id` int NOT NULL AUTO_INCREMENT,
  `t_name` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `t_icon` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `t_url` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `t_main` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `t_status` int NOT NULL,
  `t_delete` int NOT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tabela `t_consumption`
--

DROP TABLE IF EXISTS `t_consumption`;
CREATE TABLE `t_consumption` (
  `t_id` int NOT NULL AUTO_INCREMENT,
  `t_school` int NOT NULL,
  `t_product` int NOT NULL,
  `t_value` double NOT NULL,
  `t_datecreated` datetime NOT NULL,
  `t_usercreated` int NOT NULL,
  `t_sessionkey` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
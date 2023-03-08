-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: db_contruction
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.25-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `getAllProducts`
--

DROP TABLE IF EXISTS `getAllProducts`;
/*!50001 DROP VIEW IF EXISTS `getAllProducts`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `getAllProducts` AS SELECT 
 1 AS `product_image`,
 1 AS `product_id`,
 1 AS `product_name`,
 1 AS `product_code`,
 1 AS `categoryName`,
 1 AS `brandName`,
 1 AS `unit`,
 1 AS `unit_price`,
 1 AS `price`,
 1 AS `qty`,
 1 AS `reorder_number`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `tblBrands`
--

DROP TABLE IF EXISTS `tblBrands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblBrands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brandName` varchar(200) NOT NULL,
  `desc` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblBrands`
--

LOCK TABLES `tblBrands` WRITE;
/*!40000 ALTER TABLE `tblBrands` DISABLE KEYS */;
INSERT INTO `tblBrands` VALUES (1,'K cement',''),(2,'ស៊ីម៉ងត៍អូឌ','');
/*!40000 ALTER TABLE `tblBrands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblCategories`
--

DROP TABLE IF EXISTS `tblCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblCategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(250) NOT NULL,
  `desc` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblCategories`
--

LOCK TABLES `tblCategories` WRITE;
/*!40000 ALTER TABLE `tblCategories` DISABLE KEYS */;
INSERT INTO `tblCategories` VALUES (1,'Cement',''),(2,'Pipes','');
/*!40000 ALTER TABLE `tblCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblCurrency`
--

DROP TABLE IF EXISTS `tblCurrency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblCurrency` (
  `cur_id` int(11) NOT NULL AUTO_INCREMENT,
  `cur_kh` float NOT NULL,
  `cur_dollar` float NOT NULL,
  PRIMARY KEY (`cur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblCurrency`
--

LOCK TABLES `tblCurrency` WRITE;
/*!40000 ALTER TABLE `tblCurrency` DISABLE KEYS */;
INSERT INTO `tblCurrency` VALUES (1,4150,1);
/*!40000 ALTER TABLE `tblCurrency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblCustomers`
--

DROP TABLE IF EXISTS `tblCustomers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblCustomers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerName` varchar(100) NOT NULL,
  `phoneNumber` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblCustomers`
--

LOCK TABLES `tblCustomers` WRITE;
/*!40000 ALTER TABLE `tblCustomers` DISABLE KEYS */;
INSERT INTO `tblCustomers` VALUES (1,'General',NULL,NULL,NULL),(3,'Dara','090782653','dara@gmail.com','BTB'),(4,'sok dara','','kakak@gmail.com',''),(6,'Kanha','','',''),(7,'Rotha','','',''),(8,'java','','','');
/*!40000 ALTER TABLE `tblCustomers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblInvoice`
--

DROP TABLE IF EXISTS `tblInvoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblInvoice` (
  `invoice_id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_number` varchar(250) DEFAULT NULL,
  `payment_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `money_change` float NOT NULL,
  PRIMARY KEY (`invoice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblInvoice`
--

LOCK TABLES `tblInvoice` WRITE;
/*!40000 ALTER TABLE `tblInvoice` DISABLE KEYS */;
INSERT INTO `tblInvoice` VALUES (1,'',1,66,0),(2,'',1,55,0),(3,'',1,22,0),(4,'',1,44,0),(5,'',1,45,1),(6,'',1,33,0),(7,'',2,55,0),(8,'',1,22,0),(9,'PSS020230225135260',1,22,0),(10,'PSS2023225010',1,22,0),(11,'PSS2023225011',1,11,0),(12,'PSS2023225012',1,33,0),(13,'PSS2023225013',1,99,0),(14,'PSS2023226014',1,234,146),(15,'PSS2023226015',1,77,0),(16,'PSS2023226016',1,33,0),(17,'PSS2023226017',2,22,0),(18,'PSS2023227018',1,22,0),(19,'PSS2023227019',1,11,0),(20,'PSS2023227020',1,11,0),(21,'PSS2023227021',1,11,0),(22,'PSS2023227022',1,22,0),(23,'PSS2023227023',1,11,0),(24,'PSS2023227024',1,11,0),(25,'PSS2023227025',1,11,0),(26,'PSS2023227026',1,11,0),(27,'PSS2023228027',1,22,0),(28,'PSS202332028',1,74,0),(29,'PSS202332029',1,37,0),(30,'PSS202332030',1,53,0),(31,'PSS202332031',2,178,0),(32,'PSS202332032',1,16,0),(33,'PSS202332033',1,1000,-143),(34,'PSS202333034',2,53,0),(35,'PSS202333035',1,11,0),(36,'PSS202333036',1,11,0),(37,'PSS202335037',1,1136,0),(38,'PSS202335038',1,57,0),(39,'PSS202336039',1,42,0),(40,'PSS202336040',1,26,0),(41,'PSS202337041',1,1102,0),(42,'PSS202337042',1,15,0),(43,'PSS202337043',1,11,0),(44,'PSS202337044',1,15,0),(45,'PSS202337045',1,26,0),(46,'PSS202337046',1,11,0);
/*!40000 ALTER TABLE `tblInvoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblPayments`
--

DROP TABLE IF EXISTS `tblPayments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblPayments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblPayments`
--

LOCK TABLES `tblPayments` WRITE;
/*!40000 ALTER TABLE `tblPayments` DISABLE KEYS */;
INSERT INTO `tblPayments` VALUES (1,'Cash'),(2,'ABA');
/*!40000 ALTER TABLE `tblPayments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblProductUnits`
--

DROP TABLE IF EXISTS `tblProductUnits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblProductUnits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unit` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblProductUnits`
--

LOCK TABLES `tblProductUnits` WRITE;
/*!40000 ALTER TABLE `tblProductUnits` DISABLE KEYS */;
INSERT INTO `tblProductUnits` VALUES (1,'ការ៉ុង'),(2,'តោន'),(3,'cm'),(4,'mm');
/*!40000 ALTER TABLE `tblProductUnits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblProducts`
--

DROP TABLE IF EXISTS `tblProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblProducts` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT 0,
  `sub_id` int(11) DEFAULT 0,
  `unit_id` int(11) NOT NULL DEFAULT 0,
  `product_code` varchar(100) DEFAULT NULL,
  `product_name` varchar(200) DEFAULT NULL,
  `qty` int(11) DEFAULT 0,
  `unit_price` float DEFAULT 0,
  `price` float DEFAULT 0,
  `exp_date` date DEFAULT NULL,
  `product_image` varchar(250) DEFAULT NULL,
  `desc` varchar(250) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `reorder_number` int(11) DEFAULT 0,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblProducts`
--

LOCK TABLES `tblProducts` WRITE;
/*!40000 ALTER TABLE `tblProducts` DISABLE KEYS */;
INSERT INTO `tblProducts` VALUES (1,1,1,1,1,'2001203','សុីម៉ង់ត័ K Cement',190,10,11,'2023-03-08','images/1678243041992cement.png','',1,3),(2,2,0,1,3,'2919183','Khmer Angkor',10,10,11,'2023-03-07','images/1678181903233cement.png','',1,3),(3,1,0,0,2,'20012','អូឌ',31,12,15,'2023-03-08','images/1677690015791cement.png','',1,3);
/*!40000 ALTER TABLE `tblProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblRoles`
--

DROP TABLE IF EXISTS `tblRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblRoles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblRoles`
--

LOCK TABLES `tblRoles` WRITE;
/*!40000 ALTER TABLE `tblRoles` DISABLE KEYS */;
INSERT INTO `tblRoles` VALUES (1,'Admin'),(2,'user');
/*!40000 ALTER TABLE `tblRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblSaleDetails`
--

DROP TABLE IF EXISTS `tblSaleDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblSaleDetails` (
  `sale_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty_sales` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblSaleDetails`
--

LOCK TABLES `tblSaleDetails` WRITE;
/*!40000 ALTER TABLE `tblSaleDetails` DISABLE KEYS */;
INSERT INTO `tblSaleDetails` VALUES (1,1,2),(1,2,4),(2,1,2),(2,2,3),(3,1,1),(3,2,1),(4,1,1),(4,2,3),(5,1,2),(5,2,2),(6,1,1),(6,2,2),(7,1,4),(7,2,1),(8,1,1),(8,2,1),(9,1,1),(9,2,1),(10,1,1),(10,2,1),(11,1,1),(12,1,1),(12,2,2),(13,1,1),(13,2,8),(14,1,3),(14,2,5),(15,1,7),(16,1,1),(16,2,2),(17,1,1),(17,2,1),(18,1,1),(18,2,1),(19,1,1),(20,1,1),(21,1,1),(22,1,1),(22,2,1),(23,1,1),(24,2,1),(25,1,1),(26,1,1),(27,1,1),(27,2,1),(28,1,2),(28,2,2),(28,3,2),(29,1,1),(29,2,1),(29,3,1),(30,1,1),(30,2,1),(30,3,1),(30,4,1),(31,2,11),(31,1,1),(31,3,1),(31,4,1),(31,6,1),(32,4,1),(33,1,1),(33,2,1),(33,3,1),(33,4,1),(33,6,1),(33,7,1),(34,1,1),(34,2,1),(34,3,1),(34,4,1),(35,2,1),(36,2,1),(37,6,2),(37,3,1),(37,4,1),(37,7,1),(38,2,1),(38,3,1),(38,4,1),(38,6,1),(39,1,1),(39,3,1),(39,4,1),(40,1,1),(40,3,1),(41,1,1),(41,4,1),(41,7,1),(42,3,1),(43,1,1),(44,3,1),(45,1,1),(45,3,1),(46,1,1);
/*!40000 ALTER TABLE `tblSaleDetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_qty` AFTER INSERT ON `tblSaleDetails` FOR EACH ROW UPDATE tblProducts SET qty = qty-new.qty_sales WHERE product_id = new.product_id AND (qty-new.qty_sales)>=0 */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tblSales`
--

DROP TABLE IF EXISTS `tblSales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblSales` (
  `sale_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `invoice_id` int(11) NOT NULL,
  `sale_date` date NOT NULL,
  PRIMARY KEY (`sale_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblSales`
--

LOCK TABLES `tblSales` WRITE;
/*!40000 ALTER TABLE `tblSales` DISABLE KEYS */;
INSERT INTO `tblSales` VALUES (1,10,0,1,'2023-02-24'),(2,10,0,2,'2023-02-24'),(3,4,0,3,'2023-02-24'),(4,4,0,4,'2023-02-24'),(5,4,0,5,'2023-02-24'),(6,4,0,6,'2023-02-25'),(7,4,0,7,'2023-02-25'),(8,4,0,8,'2023-02-25'),(9,4,0,9,'2023-02-25'),(10,4,0,10,'2023-02-25'),(11,4,0,11,'2023-02-25'),(12,4,0,12,'2023-02-25'),(13,4,0,13,'2023-02-25'),(14,4,0,14,'2023-02-26'),(15,4,0,15,'2023-02-26'),(16,4,0,16,'2023-02-26'),(17,4,0,17,'2023-02-26'),(18,4,1,18,'2023-02-27'),(19,4,5,19,'2023-02-27'),(20,4,4,20,'2023-02-27'),(21,4,3,21,'2023-02-27'),(22,4,1,22,'2023-02-27'),(23,4,1,23,'2023-02-27'),(24,4,1,24,'2023-02-27'),(25,4,1,25,'2023-02-27'),(26,4,3,26,'2023-02-27'),(27,4,1,27,'2023-02-28'),(28,4,1,28,'2023-03-02'),(29,4,1,29,'2023-03-02'),(30,4,1,30,'2023-03-02'),(31,4,1,31,'2023-03-02'),(32,4,1,32,'2023-03-02'),(33,4,1,33,'2023-03-02'),(34,4,1,34,'2023-03-03'),(35,4,1,35,'2023-03-03'),(36,4,1,36,'2023-03-03'),(37,4,1,37,'2023-03-05'),(38,4,1,38,'2023-03-05'),(39,4,1,39,'2023-03-06'),(40,4,1,40,'2023-03-06'),(41,4,1,41,'2023-03-07'),(42,4,1,42,'2023-03-07'),(43,4,1,43,'2023-03-07'),(44,4,1,44,'2023-03-07'),(45,4,1,45,'2023-03-07'),(46,4,1,46,'2023-03-07');
/*!40000 ALTER TABLE `tblSales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblStatus`
--

DROP TABLE IF EXISTS `tblStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblStatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblStatus`
--

LOCK TABLES `tblStatus` WRITE;
/*!40000 ALTER TABLE `tblStatus` DISABLE KEYS */;
INSERT INTO `tblStatus` VALUES (1,'Enable'),(2,'Disable');
/*!40000 ALTER TABLE `tblStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblSupplies`
--

DROP TABLE IF EXISTS `tblSupplies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblSupplies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supName` varchar(250) NOT NULL,
  `companyName` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblSupplies`
--

LOCK TABLES `tblSupplies` WRITE;
/*!40000 ALTER TABLE `tblSupplies` DISABLE KEYS */;
INSERT INTO `tblSupplies` VALUES (1,'Jonh Doe','KCM','','','');
/*!40000 ALTER TABLE `tblSupplies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblUsers`
--

DROP TABLE IF EXISTS `tblUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblUsers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `phone_number` varchar(100) DEFAULT NULL,
  `token` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblUsers`
--

LOCK TABLES `tblUsers` WRITE;
/*!40000 ALTER TABLE `tblUsers` DISABLE KEYS */;
INSERT INTO `tblUsers` VALUES (4,1,1,'saochea','$2b$10$0c3EGKTyecFFWAxty5DPJ.YJJNlf5Ehh7QxrFhMg64cJ5rlOcG66a','saocheaphan@gmail.com','908755','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQsInVzZXJuYW1lIjoic2FvY2hlYSIsImVtYWlsIjoic2FvY2hlYXBoYW5AZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjc4MjU0MDgzLCJleHAiOjE2NzgzNDA0ODN9.XUSRXaRpX_Jm4qO_tNp_hoXXvD0baHzml_ial2X4SV0'),(10,2,2,'chea@#','$2b$10$XQph20tIZ.HUDYxv.QQFDuxALn10IoaK2eXhPYIin.BXMEjZm2rB.','dara@gmail.com','908755',NULL),(15,1,2,'chea','$2b$10$UOebboThYNxNWEbW2betU.a/BJyfFFySjJicAIFdxJNPUgoX5zqQ6','','',NULL),(16,1,2,'netfighter','$2b$10$ErpcXibhWTRGZuw5mLCm7eAWukqrZACiexIWPaOuv/CZi52dJoWcm','','',NULL);
/*!40000 ALTER TABLE `tblUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `getAllProducts`
--

/*!50001 DROP VIEW IF EXISTS `getAllProducts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `getAllProducts` AS select `tblProducts`.`product_image` AS `product_image`,`tblProducts`.`product_id` AS `product_id`,`tblProducts`.`product_name` AS `product_name`,`tblProducts`.`product_code` AS `product_code`,`tblCategories`.`categoryName` AS `categoryName`,`tblBrands`.`brandName` AS `brandName`,`tblProductUnits`.`unit` AS `unit`,`tblProducts`.`unit_price` AS `unit_price`,`tblProducts`.`price` AS `price`,`tblProducts`.`qty` AS `qty`,`tblProducts`.`reorder_number` AS `reorder_number` from (((`tblProducts` left join `tblCategories` on(`tblProducts`.`category_id` = `tblCategories`.`id`)) left join `tblBrands` on(`tblProducts`.`brand_id` = `tblBrands`.`id`)) left join `tblProductUnits` on(`tblProducts`.`unit_id` = `tblProductUnits`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-08 13:00:57

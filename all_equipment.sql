-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: all_equipment
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `current_relay`
--

DROP TABLE IF EXISTS `current_relay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `current_relay` (
  `id` int NOT NULL AUTO_INCREMENT,
  `relay_type` varchar(20) DEFAULT NULL,
  `ac_dc` varchar(2) DEFAULT NULL,
  `relay_current` float DEFAULT NULL,
  `year` year DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `note` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=338 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `current_relay`
--

LOCK TABLES `current_relay` WRITE;
/*!40000 ALTER TABLE `current_relay` DISABLE KEYS */;
INSERT INTO `current_relay` VALUES (324,'VF-2','~',20,2002,2,NULL),(333,'VF-2','~',30,2030,30,NULL),(334,'VF-3','~',33,2003,3,NULL),(335,'VF-1','~',10,2001,1,NULL),(336,'VF-1','=',10,2011,11,NULL);
/*!40000 ALTER TABLE `current_relay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `current_transformers`
--

DROP TABLE IF EXISTS `current_transformers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `current_transformers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(20) DEFAULT NULL,
  `coil_05` varchar(20) DEFAULT NULL,
  `coil_10p` varchar(20) DEFAULT NULL,
  `year` year DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `current_transformers`
--

LOCK TABLES `current_transformers` WRITE;
/*!40000 ALTER TABLE `current_transformers` DISABLE KEYS */;
INSERT INTO `current_transformers` VALUES (1,'ТТФ-1','100/5','100/5',1989,2),(2,'ТТФ-2','100/5','200/5',1981,1),(3,'ТТФ-2','100/5','200/5',2006,1),(4,'ТТФ-3','300/5','300/5',2003,1),(5,'ТТФ-3','300/5','300/5',1983,1);
/*!40000 ALTER TABLE `current_transformers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `measuring_instruments`
--

DROP TABLE IF EXISTS `measuring_instruments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `measuring_instruments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `device` varchar(30) DEFAULT NULL,
  `device_type` varchar(20) DEFAULT NULL,
  `measurement_limit` varchar(20) DEFAULT NULL,
  `year` year DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `next_verification` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `measuring_instruments`
--

LOCK TABLES `measuring_instruments` WRITE;
/*!40000 ALTER TABLE `measuring_instruments` DISABLE KEYS */;
INSERT INTO `measuring_instruments` VALUES (9,'амперметр','АФ-2','0-150 А',2003,1,'2024-06-23'),(11,'вольтметр','ВФ-2','0-300 В',2006,2,'2023-12-29'),(12,'вольтметр','ВФ-1','0-300 В',1990,2,'2024-06-17'),(13,'амперметр','АФ-3','0-300 А',2001,1,'2023-10-29'),(15,'амперметр','АФ-1','0-200 А',1985,1,'2024-10-17'),(17,'амперметр','АФ-1','0-450 А',2002,1,'2025-10-10'),(18,'вольтметр','ВФ-2','0-300 В',2006,2,'2024-12-29'),(19,'милливольтметр','мАФ-1','1-5 мВ',2000,3,'2025-05-05');
/*!40000 ALTER TABLE `measuring_instruments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_table`
--

DROP TABLE IF EXISTS `my_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_table`
--

LOCK TABLES `my_table` WRITE;
/*!40000 ALTER TABLE `my_table` DISABLE KEYS */;
INSERT INTO `my_table` VALUES (1,'Biba',10),(2,'Pupa',11),(4,'Kuka',10);
/*!40000 ALTER TABLE `my_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `substation`
--

DROP TABLE IF EXISTS `substation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `substation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `substation` varchar(20) DEFAULT NULL,
  `fider` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `substation`
--

LOCK TABLES `substation` WRITE;
/*!40000 ALTER TABLE `substation` DISABLE KEYS */;
INSERT INTO `substation` VALUES (1,'Водозабор','Ф-1'),(2,'Водозабор','Ф-2'),(3,'Водозабор','Ф-3'),(4,'Заря','Ф-1'),(5,'Заря','Ф-2'),(6,'Радуга','Ф-1'),(7,'Радуга','Ф-2'),(34,'hgytrdescvghjkuytrew','jhuyt');
/*!40000 ALTER TABLE `substation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `substation_current_relay`
--

DROP TABLE IF EXISTS `substation_current_relay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `substation_current_relay` (
  `fider_id` int NOT NULL,
  `current_relay_id` int NOT NULL,
  PRIMARY KEY (`fider_id`,`current_relay_id`),
  KEY `current_relay_id` (`current_relay_id`),
  CONSTRAINT `substation_current_relay_ibfk_1` FOREIGN KEY (`fider_id`) REFERENCES `substation` (`id`),
  CONSTRAINT `substation_current_relay_ibfk_2` FOREIGN KEY (`current_relay_id`) REFERENCES `current_relay` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `substation_current_relay`
--

LOCK TABLES `substation_current_relay` WRITE;
/*!40000 ALTER TABLE `substation_current_relay` DISABLE KEYS */;
INSERT INTO `substation_current_relay` VALUES (1,324),(2,324),(4,324),(7,324),(1,333),(2,333),(3,334),(4,334),(7,334),(5,335),(6,335),(5,336),(6,336);
/*!40000 ALTER TABLE `substation_current_relay` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50003 TRIGGER `after_delete_trigger` AFTER DELETE ON `substation_current_relay` FOR EACH ROW BEGIN
    DECLARE reminder INT;
    SET reminder = (SELECT COUNT(*) FROM substation_current_relay 
    WHERE current_relay_id = OLD.current_relay_id);
    update trigger_result
    set id=OLD.current_relay_id, item=reminder;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `substation_current_transformers`
--

DROP TABLE IF EXISTS `substation_current_transformers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `substation_current_transformers` (
  `fider_id` int NOT NULL,
  `current_transformer_id` int NOT NULL,
  PRIMARY KEY (`fider_id`,`current_transformer_id`),
  KEY `current_transformer_id` (`current_transformer_id`),
  CONSTRAINT `substation_current_transformers_ibfk_1` FOREIGN KEY (`fider_id`) REFERENCES `substation` (`id`),
  CONSTRAINT `substation_current_transformers_ibfk_2` FOREIGN KEY (`current_transformer_id`) REFERENCES `current_transformers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `substation_current_transformers`
--

LOCK TABLES `substation_current_transformers` WRITE;
/*!40000 ALTER TABLE `substation_current_transformers` DISABLE KEYS */;
INSERT INTO `substation_current_transformers` VALUES (1,1),(4,1),(6,1),(2,2),(5,2),(7,2),(2,3),(5,3),(7,3),(3,4),(3,5),(5,5);
/*!40000 ALTER TABLE `substation_current_transformers` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50003 TRIGGER `after_delete_trigger_current_transformer` AFTER DELETE ON `substation_current_transformers` FOR EACH ROW BEGIN
    DECLARE reminder INT;
    SET reminder = (SELECT COUNT(*) FROM substation_current_transformers 
    WHERE current_transformer_id = OLD.current_transformer_id);
    UPDATE trigger_result
    SET id=OLD.current_transformer_id, item=reminder;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `substation_measuring_instruments`
--

DROP TABLE IF EXISTS `substation_measuring_instruments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `substation_measuring_instruments` (
  `fider_id` int NOT NULL,
  `measuring_instrument_id` int NOT NULL,
  PRIMARY KEY (`fider_id`,`measuring_instrument_id`),
  KEY `measuring_instrument_id` (`measuring_instrument_id`),
  CONSTRAINT `substation_measuring_instruments_ibfk_1` FOREIGN KEY (`fider_id`) REFERENCES `substation` (`id`),
  CONSTRAINT `substation_measuring_instruments_ibfk_2` FOREIGN KEY (`measuring_instrument_id`) REFERENCES `measuring_instruments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `substation_measuring_instruments`
--

LOCK TABLES `substation_measuring_instruments` WRITE;
/*!40000 ALTER TABLE `substation_measuring_instruments` DISABLE KEYS */;
INSERT INTO `substation_measuring_instruments` VALUES (2,9),(5,9),(7,9),(7,11),(1,12),(4,12),(6,12),(1,13),(3,13),(1,15),(4,15),(6,15),(2,17),(3,17),(2,18),(5,19),(6,19);
/*!40000 ALTER TABLE `substation_measuring_instruments` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50003 TRIGGER `after_delete_trigger_measuring` AFTER DELETE ON `substation_measuring_instruments` FOR EACH ROW BEGIN
    DECLARE reminder INT;
    SET reminder = (SELECT COUNT(*) FROM substation_measuring_instruments 
    WHERE measuring_instrument_id = OLD.measuring_instrument_id);
    UPDATE trigger_result
    SET id=OLD.measuring_instrument_id, item=reminder;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `substation_voltage_relay`
--

DROP TABLE IF EXISTS `substation_voltage_relay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `substation_voltage_relay` (
  `fider_id` int NOT NULL,
  `voltage_relay_id` int NOT NULL,
  PRIMARY KEY (`fider_id`,`voltage_relay_id`),
  KEY `voltage_relay_id` (`voltage_relay_id`),
  CONSTRAINT `substation_voltage_relay_ibfk_1` FOREIGN KEY (`fider_id`) REFERENCES `substation` (`id`),
  CONSTRAINT `substation_voltage_relay_ibfk_2` FOREIGN KEY (`voltage_relay_id`) REFERENCES `voltage_relay` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `substation_voltage_relay`
--

LOCK TABLES `substation_voltage_relay` WRITE;
/*!40000 ALTER TABLE `substation_voltage_relay` DISABLE KEYS */;
INSERT INTO `substation_voltage_relay` VALUES (4,4),(6,4),(7,5),(5,6),(2,10),(2,13),(1,14),(2,14),(2,15),(4,17),(1,18),(5,18),(6,18),(7,19),(1,20),(3,20);
/*!40000 ALTER TABLE `substation_voltage_relay` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50003 TRIGGER `after_delete_trigger_voltage` AFTER DELETE ON `substation_voltage_relay` FOR EACH ROW BEGIN
    DECLARE reminder INT;
    SET reminder = (SELECT COUNT(*) FROM substation_voltage_relay 
    WHERE voltage_relay_id = OLD.voltage_relay_id);
    update trigger_result
    set id=OLD.voltage_relay_id, item=reminder;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `trigger_result`
--

DROP TABLE IF EXISTS `trigger_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trigger_result` (
  `id` int DEFAULT NULL,
  `item` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trigger_result`
--

LOCK TABLES `trigger_result` WRITE;
/*!40000 ALTER TABLE `trigger_result` DISABLE KEYS */;
INSERT INTO `trigger_result` VALUES (14,0);
/*!40000 ALTER TABLE `trigger_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voltage_relay`
--

DROP TABLE IF EXISTS `voltage_relay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voltage_relay` (
  `id` int NOT NULL AUTO_INCREMENT,
  `relay_type` varchar(20) DEFAULT NULL,
  `ac_dc` varchar(3) DEFAULT NULL,
  `relay_voltage` float DEFAULT NULL,
  `year` year DEFAULT NULL,
  `quantity` smallint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voltage_relay`
--

LOCK TABLES `voltage_relay` WRITE;
/*!40000 ALTER TABLE `voltage_relay` DISABLE KEYS */;
INSERT INTO `voltage_relay` VALUES (1,'РП-25','~',220,1988,2),(2,'РП-25','~',220,1988,1),(4,'РП-23','~',220,1990,2),(5,'РП-23','~',220,2006,1),(6,'РП-256','~',220,2008,3),(10,'РВ-135','~',2020,2017,1),(13,'VF-1u','~',10,2001,10),(14,'VF-1u','~',10,2001,11),(15,'VF-1u','~',10,2001,12),(17,'РП-25','~',220,1998,2),(18,'РВ-127','=',220,2001,1),(19,'РП-23','~',220,1988,1),(20,'РП-25','=',220,2019,2);
/*!40000 ALTER TABLE `voltage_relay` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-28 12:26:09

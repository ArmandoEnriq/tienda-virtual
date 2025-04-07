-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: tienda_virtual
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `detalles_pedidos`
--

DROP TABLE IF EXISTS `detalles_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalles_pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `detalles_pedidos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  CONSTRAINT `detalles_pedidos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_pedidos`
--

LOCK TABLES `detalles_pedidos` WRITE;
/*!40000 ALTER TABLE `detalles_pedidos` DISABLE KEYS */;
INSERT INTO `detalles_pedidos` VALUES (2,3,2,1,89.99),(3,4,3,1,99.99),(4,5,37,1,344.00),(5,5,17,1,3000.00),(6,5,59,1,344.00),(7,6,3,1,99.99),(8,6,12,1,2000.00),(9,7,59,1,344.00),(10,7,3,1,99.99),(11,8,12,1,2000.00),(12,8,37,1,344.00);
/*!40000 ALTER TABLE `detalles_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,7,NULL,506.00),(2,1,'2025-03-31 17:47:43',99.99),(3,7,'2025-03-31 18:07:39',89.99),(4,7,'2025-03-31 19:01:13',99.99),(5,7,'2025-03-31 19:11:08',3688.00),(6,2,'2025-03-31 19:12:17',2099.99),(7,8,'2025-03-31 19:26:56',443.99),(8,7,'2025-03-31 23:27:59',2344.00);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `cantidad` int NOT NULL DEFAULT '0',
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (2,'Zapatos deportivos Nike','Zapatos para correr',89.99,50,'https://images.pexels.com/photos/8534450/pexels-photo-8534450.jpeg?auto=compress&cs=tinysrgb&h=350'),(3,'Camisa Cuello Largo','Camisa casual para eventos',99.99,20,'https://images.pexels.com/photos/8471838/pexels-photo-8471838.jpeg?auto=compress&cs=tinysrgb&h=350'),(12,'Collar Caracola','Collar de oro blanco 24k',2000.00,8,'https://images.pexels.com/photos/31342658/pexels-photo-31342658.jpeg?auto=compress&cs=tinysrgb&h=350'),(17,'Perro','perro de caza',3000.00,6,'https://images.pexels.com/photos/31339390/pexels-photo-31339390.jpeg?auto=compress&cs=tinysrgb&h=350'),(37,'Gatito','gato',344.00,33,'https://images.pexels.com/photos/979003/pexels-photo-979003.jpeg?auto=compress&cs=tinysrgb&h=350'),(59,'paleta','sss',344.00,3,'https://images.pexels.com/photos/7302101/pexels-photo-7302101.jpeg?auto=compress&cs=tinysrgb&h=350'),(60,'tela','sssss',343.00,3,'https://images.pexels.com/photos/7483122/pexels-photo-7483122.jpeg?auto=compress&cs=tinysrgb&h=350'),(63,'papa','potatoe',20.00,30,'https://images.pexels.com/photos/1660192/pexels-photo-1660192.jpeg?auto=compress&cs=tinysrgb&h=350'),(64,'Guantes','guante para invierno',400.00,20,'https://images.pexels.com/photos/29221190/pexels-photo-29221190.jpeg?auto=compress&cs=tinysrgb&h=350');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','encargado','usuario') NOT NULL DEFAULT 'usuario',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Juan Pérez','juan@example.com','$2b$10$8Fev7k8LYSRY8aLcF0rvI.hRaEM7Gd/WaJSGgmGyoTVope188K1Wu','encargado'),(2,'Pepe Pérez','pepe@tienda.com','$2b$10$WlYxbtmLC9P2YIuHUOrgduJaj9JsJpBi9xgRfMP8a6/BeCMm52wve','usuario'),(7,'Admin Principal','admin@leveling.com','$2b$10$S3mOU1i0eXBEfX9fIMUsgOtd/yCn2oIXIDs4eM.MOSmXgM76k21gO','admin'),(8,'sui','sui@hotmail.com','$2b$10$9UfKpqm8ujF0nUrmlB7IIunKjm4u9NJ36Bg2/HfbtHItoRQoBBGMG','usuario'),(9,'ana','ana@gmail.com','$2b$10$fkl3GMTSvj1T9jVBP3KhiOK4f27sxDZP3NJFR6rVVhAFDXO0NarD2','usuario');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tienda_virtual'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-07 15:59:41

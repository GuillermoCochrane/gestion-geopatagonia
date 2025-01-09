CREATE DATABASE  IF NOT EXISTS `geopatagonia_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `geopatagonia_db`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: geopatagonia_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Dumping data for table `adjuntos_observacion_pac`
--

LOCK TABLES `adjuntos_observacion_pac` WRITE;
/*!40000 ALTER TABLE `adjuntos_observacion_pac` DISABLE KEYS */;
/*!40000 ALTER TABLE `adjuntos_observacion_pac` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `adjuntos_originaciones`
--

LOCK TABLES `adjuntos_originaciones` WRITE;
/*!40000 ALTER TABLE `adjuntos_originaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `adjuntos_originaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `entes_inspectores`
--

LOCK TABLES `entes_inspectores` WRITE;
/*!40000 ALTER TABLE `entes_inspectores` DISABLE KEYS */;
INSERT INTO `entes_inspectores` VALUES (1,'GeoPatagonia','2025-01-09 22:19:38','2025-01-09 22:19:38'),(2,'YPF','2025-01-09 22:20:08','2025-01-09 22:20:08'),(3,'Pan American Energy','2025-01-09 22:20:45','2025-01-09 22:20:45'),(4,'Tecpetrol','2025-01-09 22:21:06','2025-01-09 22:21:06'),(5,'CGC','2025-01-09 22:21:20','2025-01-09 22:21:20'),(6,'Chevron','2025-01-09 22:21:37','2025-01-09 22:21:37'),(7,'Petrobras','2025-01-09 22:21:46','2025-01-09 22:21:46');
/*!40000 ALTER TABLE `entes_inspectores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `estados`
--

LOCK TABLES `estados` WRITE;
/*!40000 ALTER TABLE `estados` DISABLE KEYS */;
/*!40000 ALTER TABLE `estados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `observaciónes_pacs`
--

LOCK TABLES `observaciónes_pacs` WRITE;
/*!40000 ALTER TABLE `observaciónes_pacs` DISABLE KEYS */;
/*!40000 ALTER TABLE `observaciónes_pacs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `origenes`
--

LOCK TABLES `origenes` WRITE;
/*!40000 ALTER TABLE `origenes` DISABLE KEYS */;
INSERT INTO `origenes` VALUES (1,'Accidente','2025-01-09 22:32:59','2025-01-09 22:32:59'),(2,'Rotura de equipo','2025-01-09 22:33:09','2025-01-09 22:33:09'),(3,'Flata de insumos','2025-01-09 22:33:17','2025-01-09 22:33:17'),(4,'Problemas climaticos','2025-01-09 22:33:45','2025-01-09 22:33:45');
/*!40000 ALTER TABLE `origenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `originaciones`
--

LOCK TABLES `originaciones` WRITE;
/*!40000 ALTER TABLE `originaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `originaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Ejecutor','2025-01-09 22:00:04','2025-01-09 22:00:04'),(2,'Originador','2025-01-09 22:00:27','2025-01-09 22:00:27'),(3,'Tratador','2025-01-09 22:00:49','2025-01-09 22:00:49'),(4,'Observador','2025-01-09 22:01:06','2025-01-09 22:01:06'),(5,'Administrador','2025-01-09 22:01:17','2025-01-09 22:01:17'),(6,'GeoPatagonia','2025-01-09 22:15:55','2025-01-09 22:15:55'),(7,'GeoPatagonia','2025-01-09 22:17:26','2025-01-09 22:17:26'),(8,'GeoPatagonia','2025-01-09 22:17:53','2025-01-09 22:17:53');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sectores`
--

LOCK TABLES `sectores` WRITE;
/*!40000 ALTER TABLE `sectores` DISABLE KEYS */;
/*!40000 ALTER TABLE `sectores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-09 19:35:11

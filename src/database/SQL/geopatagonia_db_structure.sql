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
-- Table structure for table `adjuntos_observacion_pac`
--

DROP TABLE IF EXISTS `adjuntos_observacion_pac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adjuntos_observacion_pac` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `archivo` varchar(200) NOT NULL,
  `descripcion` varchar(300) DEFAULT '-',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `observacion_pac_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `adjuntos_observaciones_pacs_id_idx` (`observacion_pac_id`),
  CONSTRAINT `adjuntos_observaciones_pacs_id` FOREIGN KEY (`observacion_pac_id`) REFERENCES `observaciónes_pacs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `adjuntos_originaciones`
--

DROP TABLE IF EXISTS `adjuntos_originaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adjuntos_originaciones` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `archivo` varchar(200) NOT NULL,
  `descripcion` varchar(300) DEFAULT '-',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `originacion_id` int(100) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_adjuntos_originacion_id_idx` (`originacion_id`),
  CONSTRAINT `fk_adjuntos_originacion_id` FOREIGN KEY (`originacion_id`) REFERENCES `originaciones` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `entes_inspectores`
--

DROP TABLE IF EXISTS `entes_inspectores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entes_inspectores` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,
  `ente_inspector` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `estados`
--

DROP TABLE IF EXISTS `estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estados` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `observaciónes_pacs`
--

DROP TABLE IF EXISTS `observaciónes_pacs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `observaciónes_pacs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `inciso` smallint(5) unsigned DEFAULT NULL,
  `descripcion` varchar(300) NOT NULL,
  `fecha_requerida` date NOT NULL,
  `referencia` varchar(100) NOT NULL,
  `fecha_negociable` tinyint(1) unsigned DEFAULT 0,
  `requiere_analisis` tinyint(1) unsigned DEFAULT 0,
  `responsable_id` int(10) unsigned NOT NULL,
  `originacion_id` int(10) unsigned NOT NULL,
  `estado_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_op_responsable_id_idx` (`responsable_id`),
  KEY `fk_op_originacion_id_idx` (`originacion_id`),
  KEY `fk_op_estado_id_idx` (`estado_id`),
  CONSTRAINT `fk_op_estado_id` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `fk_op_originacion_id` FOREIGN KEY (`originacion_id`) REFERENCES `originaciones` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `fk_op_responsable_id` FOREIGN KEY (`responsable_id`) REFERENCES `usuarios` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `origenes`
--

DROP TABLE IF EXISTS `origenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `origenes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `origen` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `originaciones`
--

DROP TABLE IF EXISTS `originaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `originaciones` (
  `id` int(100) unsigned NOT NULL,
  `fecha_de_observacion` date NOT NULL,
  `lugar` varchar(60) NOT NULL,
  `ente_inspector_id` int(100) unsigned NOT NULL,
  `origen_id` int(10) unsigned NOT NULL,
  `observador_id` int(100) unsigned NOT NULL,
  `sector_id` int(100) unsigned NOT NULL,
  `estado_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_usuario_ente_inspector_idx` (`ente_inspector_id`),
  KEY `fk_usuario_origen_id_idx` (`origen_id`),
  KEY `fk_originacion_observador_id_idx` (`observador_id`),
  KEY `fk_originacion_sector_id_idx` (`sector_id`),
  KEY `fk_originacion_estado_idx` (`estado_id`),
  CONSTRAINT `fk_originacion_ente_inspector_id` FOREIGN KEY (`ente_inspector_id`) REFERENCES `entes_inspectores` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `fk_originacion_estado` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `fk_originacion_observador_id` FOREIGN KEY (`observador_id`) REFERENCES `usuarios` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `fk_originacion_origen_id` FOREIGN KEY (`origen_id`) REFERENCES `origenes` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `fk_originacion_sector_id` FOREIGN KEY (`sector_id`) REFERENCES `sectores` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rol` varchar(60) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sectores`
--

DROP TABLE IF EXISTS `sectores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sectores` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,
  `sector` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(100) unsigned NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(70) NOT NULL,
  `rol_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_usuarios_roles_idx` (`rol_id`),
  CONSTRAINT `fk_usuarios_roles` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-13 12:58:28

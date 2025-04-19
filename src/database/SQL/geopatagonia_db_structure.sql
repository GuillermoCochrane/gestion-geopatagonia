CREATE DATABASE  IF NOT EXISTS `geopatagonia_db` 
USE `geopatagonia_db`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)

--
-- Table structure for table `acciones`
--

DROP TABLE IF EXISTS `acciones`;
CREATE TABLE `acciones` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `accion` varchar(300) NOT NULL,
  `fecha_realizacion` date DEFAULT NULL,
  `ejecutor_id` int(10) unsigned NOT NULL,
  `observacion_pac_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_op_ejecutor_id_idx` (`ejecutor_id`),
  KEY `fk_op_observacion_pac_id_idx` (`observacion_pac_id`),
  CONSTRAINT `fk_op_ejecutor_id` FOREIGN KEY (`ejecutor_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_op_observacion_pac_id` FOREIGN KEY (`observacion_pac_id`) REFERENCES `observaciones_pacs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `adjuntos_observacion_pac`
--

DROP TABLE IF EXISTS `adjuntos_observacion_pac`;
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
  CONSTRAINT `adjuntos_observaciones_pacs_id` FOREIGN KEY (`observacion_pac_id`) REFERENCES `observaciones_pacs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `adjuntos_originaciones`
--

DROP TABLE IF EXISTS `adjuntos_originaciones`;
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

--
-- Table structure for table `entes_inspectores`
--

DROP TABLE IF EXISTS `entes_inspectores`;
CREATE TABLE `entes_inspectores` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,
  `ente_inspector` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `estados`
--

DROP TABLE IF EXISTS `estados`;
CREATE TABLE `estados` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `estado` varchar(60) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `observaciones_pacs`
--

DROP TABLE IF EXISTS `observaciones_pacs`;
CREATE TABLE `observaciones_pacs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `inciso` varchar(5) DEFAULT NULL,
  `descripcion` varchar(300) NOT NULL,
  `fecha_requerida` date NOT NULL,
  `referencia` varchar(100) DEFAULT NULL,
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

--
-- Table structure for table `origenes`
--

DROP TABLE IF EXISTS `origenes`;
CREATE TABLE `origenes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `origen` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `originaciones`
--

DROP TABLE IF EXISTS `originaciones`;
CREATE TABLE `originaciones` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,
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

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rol` varchar(60) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `sectores`
--

DROP TABLE IF EXISTS `sectores`;
CREATE TABLE `sectores` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,
  `sector` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,
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
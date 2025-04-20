CREATE DATABASE  IF NOT EXISTS `geopatagonia_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
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
-- Dumping data for table `entes_inspectores`
--

LOCK TABLES `entes_inspectores` WRITE;
INSERT INTO `entes_inspectores` VALUES (1,'GeoPatagonia','2025-01-09 22:19:38','2025-01-09 22:19:38'),(2,'YPF','2025-01-09 22:20:08','2025-01-09 22:20:08'),(3,'Pan American Energy','2025-01-09 22:20:45','2025-01-09 22:20:45'),(4,'Tecpetrol','2025-01-09 22:21:06','2025-01-09 22:21:06'),(5,'CGC','2025-01-09 22:21:20','2025-01-09 22:21:20'),(6,'Chevron','2025-01-09 22:21:37','2025-01-09 22:21:37'),(7,'Petrobras','2025-01-09 22:21:46','2025-01-09 22:21:46');
UNLOCK TABLES;

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
-- Dumping data for table `estados`
--

LOCK TABLES `estados` WRITE;
INSERT INTO `estados` VALUES (1,'Abierta',NULL,'2025-01-09 22:55:31','2025-01-09 22:55:31'),(2,'No tratado',NULL,'2025-01-09 22:55:54','2025-01-09 22:55:54'),(3,'En Curso',NULL,'2025-01-09 22:56:07','2025-01-09 22:56:07'),(4,'Con Acciones Vencidas',NULL,'2025-01-09 22:56:24','2025-01-09 22:56:24'),(5,'Vencidas',NULL,'2025-01-09 22:56:34','2025-01-09 22:56:34'),(6,'Cerrado',NULL,'2025-01-09 22:56:49','2025-01-09 22:56:49'),(7,'No Verificadas',NULL,'2025-01-09 22:57:07','2025-01-09 22:57:07'),(8,'Verificado No Efectivo',NULL,'2025-01-09 22:57:33','2025-01-09 22:57:33'),(9,'Verificado Efectivo',NULL,'2025-01-09 22:57:44','2025-01-09 22:57:44');
UNLOCK TABLES;

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
-- Dumping data for table `observaciones_pacs`
--

LOCK TABLES `observaciones_pacs` WRITE;
INSERT INTO `observaciones_pacs` VALUES (1,'R','la descripcion es obligatoria','2025-04-03','Referencia del incidente',1,1,6,1,1,'2025-03-31 22:18:20','2025-04-18 21:03:34'),(2,'R','Plan de accion correctiva del incidente','2025-04-04','Referencia del incidente',1,1,5,1,1,'2025-03-31 22:20:18','2025-03-31 22:20:18'),(3,'B','Chequeo del PAC','2025-05-10','',1,0,7,1,1,'2025-03-31 22:21:42','2025-03-31 22:21:42');
UNLOCK TABLES;

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
-- Dumping data for table `origenes`
--

LOCK TABLES `origenes` WRITE;
INSERT INTO `origenes` VALUES (1,'Accidente','2025-01-09 22:32:59','2025-01-09 22:32:59'),(2,'Rotura de equipo','2025-01-09 22:33:09','2025-01-09 22:33:09'),(3,'Falta de insumos','2025-01-09 22:33:17','2025-01-09 22:33:17'),(4,'Problemas climaticos','2025-01-09 22:33:45','2025-01-09 22:33:45');
UNLOCK TABLES;

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
-- Dumping data for table `originaciones`
--

LOCK TABLES `originaciones` WRITE;
INSERT INTO `originaciones` VALUES (1,'2025-03-22','Cordoba',1,1,4,2,1,'2025-03-21 20:29:56','2025-03-21 20:29:56'),(2,'2025-03-24','Catamarca',2,1,3,5,1,'2025-03-31 22:54:48','2025-03-31 22:54:48');
UNLOCK TABLES;

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
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
INSERT INTO `roles` VALUES (1,'Ejecutor','2025-01-09 22:00:04','2025-01-09 22:00:04'),(2,'Originador','2025-01-09 22:00:27','2025-01-09 22:00:27'),(3,'Tratador','2025-01-09 22:00:49','2025-01-09 22:00:49'),(4,'Observador','2025-01-09 22:01:06','2025-01-09 22:01:06'),(5,'Administrador','2025-01-23 20:03:04','2025-01-23 20:03:04');
UNLOCK TABLES;

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
-- Dumping data for table `sectores`
--

LOCK TABLES `sectores` WRITE;
INSERT INTO `sectores` VALUES (1,'SMAC','2025-01-09 22:41:20','2025-01-09 22:41:20'),(2,'Coiled Tubing','2025-01-09 22:42:21','2025-01-09 22:42:21'),(3,'Cementación y Estimulación','2025-01-09 22:42:35','2025-01-09 22:42:35'),(4,'Control Geológico','2025-01-09 22:42:48','2025-01-09 22:42:48'),(5,'Wireline','2025-01-09 22:43:04','2025-01-09 22:43:04');
UNLOCK TABLES;

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

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
INSERT INTO `usuarios` VALUES (1,'Guillermo Cochrane','guilleac81@gmail.com','hashed_password_1',5,'2025-03-07 22:55:41','2025-03-07 22:57:40'),(2,'Carlos Rodriguez','CarlosRodriguez80@geopatagonia.com','$2a$10$1YYCPcDYYmMpW2L.vi0qquKHqBbC6NlnXjFuIJDeOF117BeqWr6aK',4,'2025-03-07 23:01:34','2025-03-07 23:01:34'),(3,'José Pérez','JosePerez72@geopatagonia.com','$2a$10$F97cO7Qv3Thw80HnpARvMeCKNJJ.ahq.dQ18xNdWeB2iI8SEPxde2',4,'2025-03-07 23:02:23','2025-03-07 23:02:23'),(4,'Roberto Gonzalez','RobertoGonzalez66@geopatagonia.com','$2a$10$.UMKoIuFx0IFe06B9PdxDOO6Q3OjRy4AmBXT2aDNMDMHqB5VxIc9C',4,'2025-03-07 23:02:56','2025-03-07 23:02:56'),(5,'Ricardo Martinez','RicardoMartinez83@geopatagonia.com','$2a$10$Y6DM6BbVP00h4h9ZSEBWM.y1Lt42OwPM52D.3iEZJYO9oyV9l3RY2',3,'2025-03-21 20:24:27','2025-03-21 20:24:27'),(6,'Alberto Hernandez','AlbertoHernandez77@geopatagonia.com','$2a$10$tyhWb/HETCe48B01HpPyneL/HqAQkRmKpx8qH47wKSmwI//IUuSpW',3,'2025-03-21 20:26:41','2025-03-21 20:26:41'),(7,'Matias Fernandez','MatiasFernandez92@geopatagonia.com','$2a$10$mpLuJs4gQkquXSYw3Pq7delV88yfouMMIfUEJF1XTvKxERYK2JCZS',3,'2025-03-21 20:28:13','2025-03-21 20:28:13'),(8,'Fernando Ramirez','FernandoRamirez78@geopatagonial.com','$2a$10$OZbAMsgasbOTWRs7eJDbqOMl/Y5pfPlTVnsqsSSY/z5wpmwyQHDBm',1,'2025-04-19 22:47:00','2025-04-19 22:47:00'),(9,'Facundo Gutierrez','FacundoGutierrez84@geopatagonial.com','$2a$10$gTf5FKguT7zJPzlUkTljgeREsklFlUE3vXi1wtdW9rrvwAJkj12xq',1,'2025-04-19 22:48:07','2025-04-19 22:48:07'),(10,'Javier Sanchez','JavierSanchez74@geopatagonial.com','$2a$10$T.tNZSyszYxoT7U/G.iPv.POiANt/6yIT0M3kMJTkjU/JRSqihsUK',1,'2025-04-19 22:50:17','2025-04-19 22:50:17'),(11,'German Mendez','GermanMendez82@geopatagonia.com','$2a$10$D/QAfDvxnskKl3XIkKRyu.7M/ICCi5didjz//GY0CTzpiG.Byg2ky',2,'2025-04-19 22:52:03','2025-04-19 22:52:03'),(12,'Mariano Lopez','MarianoLopez95@geopatagonia.com','$2a$10$Gx.u4g8JFB0513Iw7HXbB.SjC0UZ9vCWk/i.bnJNHooEIFF2VaGMy',2,'2025-04-19 23:06:24','2025-04-19 23:06:24'),(13,'Martin Gallardo','MartinGallardo84@geopatagonia.com','$2a$10$8Ft./BvJRxTS2qgeRG7.U.iOoX9lhfsLswu6iATCXAYdX19VPX/w6',2,'2025-04-19 23:09:15','2025-04-19 23:09:15');
UNLOCK TABLES;
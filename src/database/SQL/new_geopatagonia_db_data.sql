-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: geopatagonia_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

--
-- Dumping data for table `entes_inspectores`
--

LOCK TABLES `entes_inspectores` WRITE;
INSERT INTO `entes_inspectores` VALUES (1,'GeoPatagonia','2025-01-09 22:19:38','2025-01-09 22:19:38'),(2,'YPF','2025-01-09 22:20:08','2025-01-09 22:20:08'),(3,'Pan American Energy','2025-01-09 22:20:45','2025-01-09 22:20:45'),(4,'Tecpetrol','2025-01-09 22:21:06','2025-01-09 22:21:06'),(5,'CGC','2025-01-09 22:21:20','2025-01-09 22:21:20'),(6,'Chevron','2025-01-09 22:21:37','2025-01-09 22:21:37'),(7,'Petrobras','2025-01-09 22:21:46','2025-01-09 22:21:46');
UNLOCK TABLES;

--
-- Dumping data for table `estados`
--

LOCK TABLES `estados` WRITE;
INSERT INTO `estados` VALUES (1,'Abierta',NULL,'2025-01-09 22:55:31','2025-01-09 22:55:31'),(2,'No tratado',NULL,'2025-01-09 22:55:54','2025-01-09 22:55:54'),(3,'En Curso',NULL,'2025-01-09 22:56:07','2025-01-09 22:56:07'),(4,'Con Acciones Vencidas',NULL,'2025-01-09 22:56:24','2025-01-09 22:56:24'),(5,'Vencidas',NULL,'2025-01-09 22:56:34','2025-01-09 22:56:34'),(6,'Cerrado',NULL,'2025-01-09 22:56:49','2025-01-09 22:56:49'),(7,'No Verificadas',NULL,'2025-01-09 22:57:07','2025-01-09 22:57:07'),(8,'Verificado No Efecitvo',NULL,'2025-01-09 22:57:33','2025-01-09 22:57:33'),(9,'Verificado Efecitvo',NULL,'2025-01-09 22:57:44','2025-01-09 22:57:44');
UNLOCK TABLES;

--
-- Dumping data for table `observaciones_pacs`
--

LOCK TABLES `observaciones_pacs` WRITE;
INSERT INTO `observaciones_pacs` VALUES (1,'R','la descripcion es obligatoria','2025-04-03','Referencia del incidente',1,1,6,1,1,'2025-03-31 22:18:20','2025-04-18 21:03:34'),(2,'R','Plan de accion correctiva del incidente','2025-04-04','Referencia del incidente',1,1,5,1,1,'2025-03-31 22:20:18','2025-03-31 22:20:18'),(3,'B','Chequeo del PAC','2025-05-10','',1,0,7,1,1,'2025-03-31 22:21:42','2025-03-31 22:21:42');
UNLOCK TABLES;

--
-- Dumping data for table `origenes`
--

LOCK TABLES `origenes` WRITE;
INSERT INTO `origenes` VALUES (1,'Accidente','2025-01-09 22:32:59','2025-01-09 22:32:59'),(2,'Rotura de equipo','2025-01-09 22:33:09','2025-01-09 22:33:09'),(3,'Flata de insumos','2025-01-09 22:33:17','2025-01-09 22:33:17'),(4,'Problemas climaticos','2025-01-09 22:33:45','2025-01-09 22:33:45');
UNLOCK TABLES;

--
-- Dumping data for table `originaciones`
--

LOCK TABLES `originaciones` WRITE;
INSERT INTO `originaciones` VALUES (1,'2025-03-22','Cordoba',1,1,4,2,1,'2025-03-21 20:29:56','2025-03-21 20:29:56'),(2,'2025-03-24','Catamarca',2,1,3,5,1,'2025-03-31 22:54:48','2025-03-31 22:54:48');
UNLOCK TABLES;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
INSERT INTO `roles` VALUES (1,'Ejecutor','2025-01-09 22:00:04','2025-01-09 22:00:04'),(2,'Originador','2025-01-09 22:00:27','2025-01-09 22:00:27'),(3,'Tratador','2025-01-09 22:00:49','2025-01-09 22:00:49'),(4,'Observador','2025-01-09 22:01:06','2025-01-09 22:01:06'),(5,'Administrador','2025-01-23 20:03:04','2025-01-23 20:03:04');
UNLOCK TABLES;

--
-- Dumping data for table `sectores`
--

LOCK TABLES `sectores` WRITE;
INSERT INTO `sectores` VALUES (1,'SMAC','2025-01-09 22:41:20','2025-01-09 22:41:20'),(2,'Coiled Tubing','2025-01-09 22:42:21','2025-01-09 22:42:21'),(3,'Cementación y Estimulación','2025-01-09 22:42:35','2025-01-09 22:42:35'),(4,'Control Geológico','2025-01-09 22:42:48','2025-01-09 22:42:48'),(5,'Wireline','2025-01-09 22:43:04','2025-01-09 22:43:04');
UNLOCK TABLES;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
INSERT INTO `usuarios` VALUES (1,'Guillermo Cochrane','guilleac81@gmail.com','hashed_password_1',5,'2025-03-07 22:55:41','2025-03-07 22:57:40'),(2,'Carlos Rodriguez','CarlosRodriguez80@geopatagonia.com','$2a$10$1YYCPcDYYmMpW2L.vi0qquKHqBbC6NlnXjFuIJDeOF117BeqWr6aK',4,'2025-03-07 23:01:34','2025-03-07 23:01:34'),(3,'José Pérez','JosePerez72@geopatagonia.com','$2a$10$F97cO7Qv3Thw80HnpARvMeCKNJJ.ahq.dQ18xNdWeB2iI8SEPxde2',4,'2025-03-07 23:02:23','2025-03-07 23:02:23'),(4,'Roberto Gonzalez','RobertoGonzalez66@geopatagonia.com','$2a$10$.UMKoIuFx0IFe06B9PdxDOO6Q3OjRy4AmBXT2aDNMDMHqB5VxIc9C',4,'2025-03-07 23:02:56','2025-03-07 23:02:56'),(5,'Ricardo Martinez','RicardoMartinez83@geopatagonia.com','$2a$10$Y6DM6BbVP00h4h9ZSEBWM.y1Lt42OwPM52D.3iEZJYO9oyV9l3RY2',3,'2025-03-21 20:24:27','2025-03-21 20:24:27'),(6,'Alberto Hernandez','AlbertoHernandez77@geopatagonia.com','$2a$10$tyhWb/HETCe48B01HpPyneL/HqAQkRmKpx8qH47wKSmwI//IUuSpW',3,'2025-03-21 20:26:41','2025-03-21 20:26:41'),(7,'Matias Fernandez','MatiasFernandez92@geopatagonia.com','$2a$10$mpLuJs4gQkquXSYw3Pq7delV88yfouMMIfUEJF1XTvKxERYK2JCZS',3,'2025-03-21 20:28:13','2025-03-21 20:28:13'),(8,'Fernando Ramirez','FernandoRamirez78@geopatagonial.com','$2a$10$OZbAMsgasbOTWRs7eJDbqOMl/Y5pfPlTVnsqsSSY/z5wpmwyQHDBm',1,'2025-04-19 22:47:00','2025-04-19 22:47:00'),(9,'Facundo Gutierrez','FacundoGutierrez84@geopatagonial.com','$2a$10$gTf5FKguT7zJPzlUkTljgeREsklFlUE3vXi1wtdW9rrvwAJkj12xq',1,'2025-04-19 22:48:07','2025-04-19 22:48:07'),(10,'Javier Sanchez','JavierSanchez74@geopatagonial.com','$2a$10$T.tNZSyszYxoT7U/G.iPv.POiANt/6yIT0M3kMJTkjU/JRSqihsUK',1,'2025-04-19 22:50:17','2025-04-19 22:50:17'),(11,'German Mendez','GermanMendez82@geopatagonia.com','$2a$10$D/QAfDvxnskKl3XIkKRyu.7M/ICCi5didjz//GY0CTzpiG.Byg2ky',2,'2025-04-19 22:52:03','2025-04-19 22:52:03'),(12,'Mariano Lopez','MarianoLopez95@geopatagonia.com','$2a$10$Gx.u4g8JFB0513Iw7HXbB.SjC0UZ9vCWk/i.bnJNHooEIFF2VaGMy',2,'2025-04-19 23:06:24','2025-04-19 23:06:24'),(13,'Maritn Gallardo','MaritnGallardo84@geopatagonia.com','$2a$10$8Ft./BvJRxTS2qgeRG7.U.iOoX9lhfsLswu6iATCXAYdX19VPX/w6',2,'2025-04-19 23:09:15','2025-04-19 23:09:15');
UNLOCK TABLES;
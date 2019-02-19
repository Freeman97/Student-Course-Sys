CREATE DATABASE  IF NOT EXISTS `scsys` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `scsys`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: scsys
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `adminId` char(12) NOT NULL,
  `adminPw` char(32) NOT NULL,
  PRIMARY KEY (`adminId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admin','NbmrWjbzI03SbbNX/UoNwQ==');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `courseId` char(6) NOT NULL,
  `courseName` char(20) NOT NULL,
  `credit` float NOT NULL,
  `size` smallint(6) DEFAULT NULL,
  `grade` smallint(6) DEFAULT NULL,
  `school` char(30) DEFAULT NULL,
  PRIMARY KEY (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('000001','数据库应用',4,100,3,'数学学院'),('000002','数理统计',4,NULL,3,'数学学院'),('000003','运筹学',4,NULL,3,'数学学院'),('000004','面向对象程序设计',3,NULL,3,'数学学院'),('100001','计算机网络',4,NULL,3,'计算机科学与工程学院'),('100002','计算机图形学',3,NULL,4,'计算机科学与工程学院');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('zmCsduMnQcXYDYolpgyDP4_h_AGRGrtD',1550595082,'{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2019-02-19T16:51:22.427Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"admin\":null,\"user\":null}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stc`
--

DROP TABLE IF EXISTS `stc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stc` (
  `courseId` char(6) NOT NULL,
  `studentId` char(12) NOT NULL,
  `teacherId` char(12) NOT NULL,
  `score` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`courseId`,`studentId`,`teacherId`),
  KEY `stc_ibfk_2` (`studentId`),
  KEY `stc_ibfk_3` (`teacherId`),
  CONSTRAINT `stc_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `tc` (`courseId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stc_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stc_ibfk_3` FOREIGN KEY (`teacherId`) REFERENCES `tc` (`teacherId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stc`
--

LOCK TABLES `stc` WRITE;
/*!40000 ALTER TABLE `stc` DISABLE KEYS */;
INSERT INTO `stc` VALUES ('000001','201612345678','201951354687',86),('000001','201630461067','201951354687',91),('000001','201687654321','201951354687',80),('000002','201612345678','201987654321',79),('000002','201630461067','201987654321',77),('000002','201687654321','201987654321',60),('000003','201612345678','201956785678',77),('000003','201630461067','201956785678',72),('000003','201687654321','201956785678',62),('100002','201656785678','201912341234',75);
/*!40000 ALTER TABLE `stc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `studentId` char(12) NOT NULL,
  `studentPw` char(32) NOT NULL,
  `sname` char(10) DEFAULT NULL,
  `ssex` char(2) DEFAULT NULL,
  `sschool` char(30) DEFAULT NULL,
  `sclass` char(30) DEFAULT NULL,
  `grade` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('201612341234','LTAJvQshrfxvXBjyumcaTA==','李田所','男','数学学院','信息管理与信息系统',3),('201612345678','g0IlA7z8AdMDAw6KfMgO/A==','李田所','男','数学学院','信息管理与信息系统',3),('201630461067','LTAJvQshrfxvXBjyumcaTA==','黄炽丰','男','数学学院','信息管理与信息系统',3),('201656785678','lpE/NWngQaKiQCGR9B5sPQ==','yzd','男','计算机科学与工程学院','计算机科学与技术',4),('201687654321','g0IlA7z8AdMDAw6KfMgO/A==','董远野','男','数学学院','信息管理与信息系统',3);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tc`
--

DROP TABLE IF EXISTS `tc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tc` (
  `courseId` char(6) NOT NULL,
  `teacherId` char(12) NOT NULL,
  PRIMARY KEY (`courseId`,`teacherId`),
  KEY `tc_ibfk_2` (`teacherId`),
  CONSTRAINT `tc_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`courseId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tc_ibfk_2` FOREIGN KEY (`teacherId`) REFERENCES `teacher` (`teacherId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tc`
--

LOCK TABLES `tc` WRITE;
/*!40000 ALTER TABLE `tc` DISABLE KEYS */;
INSERT INTO `tc` VALUES ('100001','201912341234'),('100002','201912341234'),('000001','201912345678'),('000004','201943214321'),('000001','201951354687'),('000002','201956785678'),('000003','201956785678'),('000002','201987654321');
/*!40000 ALTER TABLE `tc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `tcfull`
--

DROP TABLE IF EXISTS `tcfull`;
/*!50001 DROP VIEW IF EXISTS `tcfull`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `tcfull` AS SELECT 
 1 AS `courseId`,
 1 AS `courseName`,
 1 AS `credit`,
 1 AS `size`,
 1 AS `grade`,
 1 AS `tname`,
 1 AS `teacherId`,
 1 AS `school`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `teacherId` char(12) NOT NULL,
  `tname` char(10) DEFAULT NULL,
  `tschool` char(30) DEFAULT NULL,
  PRIMARY KEY (`teacherId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES ('201912341234','贺小箭','计算机科学与工程学院'),('201912345678','陆子强','数学学院'),('201943214321','梁景鸿','数学学院'),('201951354687','吴广潮','数学学院'),('201956785678','贲树军','数学学院'),('201987654321','何志坚','数学学院');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `tcfull`
--

/*!50001 DROP VIEW IF EXISTS `tcfull`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `tcfull` AS select `course`.`courseId` AS `courseId`,`course`.`courseName` AS `courseName`,`course`.`credit` AS `credit`,`course`.`size` AS `size`,`course`.`grade` AS `grade`,`teacher`.`tname` AS `tname`,`teacher`.`teacherId` AS `teacherId`,`course`.`school` AS `school` from ((`course` join `teacher`) join `tc`) where ((`course`.`courseId` = `tc`.`courseId`) and (`tc`.`teacherId` = `teacher`.`teacherId`)) */;
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

-- Dump completed on 2019-02-20  0:23:57

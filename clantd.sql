# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 115.29.232.189 (MySQL 5.5.43-log)
# Database: clantd
# Generation Time: 2016-10-28 06:27:46 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table finfo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `finfo`;

CREATE TABLE `finfo` (
  `infoId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createDate` datetime DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL,
  `categoryName` varchar(100) DEFAULT NULL,
  `topic` varchar(100) DEFAULT NULL,
  `content` text,
  `url` varchar(500) DEFAULT NULL,
  `headImage` varchar(100) DEFAULT NULL,
  `infoDes` varchar(100) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `categoryId` int(20) DEFAULT NULL,
  PRIMARY KEY (`infoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table finfocategory
# ------------------------------------------------------------

DROP TABLE IF EXISTS `finfocategory`;

CREATE TABLE `finfocategory` (
  `categoryId` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(20) DEFAULT NULL,
  `orderNum` int(20) DEFAULT NULL,
  `pCategoryId` int(20) DEFAULT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table fmenu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fmenu`;

CREATE TABLE `fmenu` (
  `menuId` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `menuKey` varchar(50) DEFAULT NULL,
  `pmenuId` int(20) DEFAULT NULL,
  `orderNum` int(20) DEFAULT NULL,
  `tourl` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`menuId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `fmenu` WRITE;
/*!40000 ALTER TABLE `fmenu` DISABLE KEYS */;

INSERT INTO `fmenu` (`menuId`, `name`, `menuKey`, `pmenuId`, `orderNum`, `tourl`)
VALUES
	(1,'后台管理','backend',-1,2000,'/backend/users'),
	(2,'用户管理','users',1,2001,'/backend/users'),
	(3,'菜单管理','menu',1,2002,'/backend/menu'),
	(4,'角色管理','role',1,2003,'/backend/role'),
	(5,'信息管理','info',-1,1000,'/info/infoList'),
	(6,'信息列表','infoList',5,1002,'/info/infoList'),
	(7,'信息类别','infoCategory',5,1000,'/info/infoCategory');

/*!40000 ALTER TABLE `fmenu` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table frole
# ------------------------------------------------------------

DROP TABLE IF EXISTS `frole`;

CREATE TABLE `frole` (
  `roleId` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `proleId` int(20) DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `frole` WRITE;
/*!40000 ALTER TABLE `frole` DISABLE KEYS */;

INSERT INTO `frole` (`roleId`, `name`, `proleId`)
VALUES
	(1,'系统管理',-1),
	(5,'信息管理员',-1);

/*!40000 ALTER TABLE `frole` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table frolemenu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `frolemenu`;

CREATE TABLE `frolemenu` (
  `roleMenuId` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `menuId` int(20) DEFAULT NULL,
  `roleId` int(20) DEFAULT NULL,
  PRIMARY KEY (`roleMenuId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `frolemenu` WRITE;
/*!40000 ALTER TABLE `frolemenu` DISABLE KEYS */;

INSERT INTO `frolemenu` (`roleMenuId`, `menuId`, `roleId`)
VALUES
	(54,5,5),
	(55,7,5),
	(56,6,5);

/*!40000 ALTER TABLE `frolemenu` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fuser
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fuser`;

CREATE TABLE `fuser` (
  `userId` int(20) NOT NULL AUTO_INCREMENT,
  `loginName` varchar(50) DEFAULT NULL,
  `loginPasw` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `fuser` WRITE;
/*!40000 ALTER TABLE `fuser` DISABLE KEYS */;

INSERT INTO `fuser` (`userId`, `loginName`, `loginPasw`, `name`)
VALUES
	(1,'admin','123','管理员'),
	(17,'xxy1','123','信息员1');

/*!40000 ALTER TABLE `fuser` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fuserrole
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fuserrole`;

CREATE TABLE `fuserrole` (
  `userRoleId` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `roleId` int(20) DEFAULT NULL,
  `userId` int(20) DEFAULT NULL,
  PRIMARY KEY (`userRoleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `fuserrole` WRITE;
/*!40000 ALTER TABLE `fuserrole` DISABLE KEYS */;

INSERT INTO `fuserrole` (`userRoleId`, `roleId`, `userId`)
VALUES
	(40,5,17);

/*!40000 ALTER TABLE `fuserrole` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

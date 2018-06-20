# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.21)
# Database: NewLmmFrame
# Generation Time: 2018-06-20 03:08:48 +0000
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
  `tag` varchar(10) DEFAULT NULL,
  `icon` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`menuId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `fmenu` WRITE;
/*!40000 ALTER TABLE `fmenu` DISABLE KEYS */;

INSERT INTO `fmenu` (`menuId`, `name`, `menuKey`, `pmenuId`, `orderNum`, `tourl`, `tag`, `icon`)
VALUES
	(1,'后台管理','backend',-1,2000,'/backend/users','normal','menu'),
	(3,'用户管理','users',1,2001,'/backend/users','normal',NULL),
	(5,'菜单列表','menu',1,2002,'/backend/menu','normal',NULL),
	(7,'角色列表','role',1,2003,'/backend/role','normal',NULL);

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
	(7,'系统管理',-1),
	(13,'测试',-1);

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
	(217,1,1),
	(218,2,1),
	(219,3,1),
	(220,4,1),
	(221,5,1),
	(222,6,1),
	(223,7,1),
	(224,8,1),
	(225,9,1),
	(226,10,1),
	(227,11,1),
	(228,12,1),
	(229,13,1),
	(230,14,1),
	(231,15,1),
	(232,17,1),
	(233,18,1),
	(234,19,1),
	(235,20,1),
	(236,21,1),
	(237,22,1),
	(238,24,1),
	(239,25,1),
	(240,26,1),
	(241,27,1),
	(242,28,1),
	(243,29,1),
	(244,30,1),
	(245,31,1),
	(246,32,1),
	(247,33,1),
	(248,34,1),
	(249,35,1),
	(250,36,1),
	(251,37,1),
	(252,38,1),
	(253,39,1),
	(254,40,1),
	(255,41,1),
	(256,42,1),
	(257,43,1),
	(258,44,1),
	(259,45,1),
	(260,46,1),
	(261,47,1),
	(262,48,1),
	(263,49,1),
	(264,50,1),
	(265,51,1),
	(266,52,1),
	(267,53,1),
	(268,54,1),
	(269,55,1),
	(270,56,1),
	(271,57,1),
	(272,58,1),
	(273,59,1),
	(274,60,1),
	(275,1,8),
	(276,4,8),
	(300,7,9),
	(301,3,9),
	(302,1,9),
	(303,5,9),
	(304,7,13),
	(305,1,13);

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
	(17,'chenliang','11111','陈靓');

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
	(44,1,1),
	(69,9,3),
	(70,7,16),
	(71,9,16),
	(72,13,17);

/*!40000 ALTER TABLE `fuserrole` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: rm-bp1hq2g7279tedkiqo.mysql.rds.aliyuncs.com (MySQL 5.7.18-log)
# Database: lmm
# Generation Time: 2018-01-04 03:12:48 +0000
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
  PRIMARY KEY (`menuId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `fmenu` WRITE;
/*!40000 ALTER TABLE `fmenu` DISABLE KEYS */;

INSERT INTO `fmenu` (`menuId`, `name`, `menuKey`, `pmenuId`, `orderNum`, `tourl`, `tag`)
VALUES
	(1,'后台管理','backend',-1,2000,'/backend/users','normal'),
	(2,'用户管理','users',1,2001,'/backend/users','normal'),
	(3,'菜单管理','menu',1,2002,'/backend/menu','normal'),
	(4,'角色管理','role',1,2003,'/backend/role','normal'),
	(5,'信息管理','info',-1,1000,'/info/infoList','normal'),
	(6,'信息列表','infoList',5,1002,'/info/infoList','normal'),
	(7,'信息类别','infoCategory',5,1000,'/info/infoCategory','normal'),
	(8,'账户管理','account',-1,900,'/account/activeAccount','account'),
	(9,'可提现账户','activeAccount',8,901,'/account/activeAccount','account'),
	(10,'申请提现','ApplyRecords',8,902,'/account/ApplyRecords','account'),
	(11,'商户管理','shopmanager',-1,800,'/shopmanager/shopapply','shop'),
	(12,'商家审核','shopapply',11,801,'/shopmanager/shopapply','shop'),
	(13,'商户管理','shoplist',11,802,'/shopmanager/shoplist','shop'),
	(14,'待审核账号','applyRecordMoneyAccountList',8,900,'/account/applyRecordMoneyAccountList','account'),
	(15,'基础资料','baseconfig',-1,1900,'/baseconfig/ticketlist','config'),
	(17,'交易信息','moneyinfo',-1,1800,'/moneyinfo/transactionlist','order'),
	(18,'流水信息','transactionlist',17,1801,'/moneyinfo/transactionlist','order'),
	(19,'优惠券管理','ticket',-1,700,'/ticket/ticketlist','activity'),
	(20,'优惠券列表','ticketlist',19,705,'/ticket/ticketlist','activity'),
	(21,'待审核优惠券','applyTicketList',19,702,'/ticket/applyTicketList','activity'),
	(22,'活动管理','activitylist',19,700,'/ticket/activitylist','activity'),
	(26,'商品管理','product',-1,850,'/product/geililist','shop'),
	(28,'商家类别','shopcategory',15,1901,'/baseconfig/shopcategory',NULL),
	(29,'商品种类','goodscategory',15,1902,'/baseconfig/goodscategory',NULL),
	(30,'首页种类','mainpagecategory',15,1903,'/baseconfig/mainpagecategory',NULL),
	(32,'商品归类','categoryproducts',26,852,'/product/categoryproducts',NULL),
	(33,'品牌管理','broad',-1,1850,'/broad/broadlist',NULL),
	(34,'品牌管理','broadlist',33,1851,'/broad/broadlist',NULL),
	(35,'待审核品牌','applybroad',33,1852,'/broad/applybroad',NULL),
	(36,'焦点图管理','slide',-1,1700,'/slide/slidelist','config'),
	(37,'焦点图列表','slidelist',36,1701,'/slide/slidelist',NULL),
	(38,'城市设置','area',15,1904,'/baseconfig/area',NULL),
	(39,'验证码','code',-1,1861,'/code/codesearch','config'),
	(40,'验证码查询','codesearch',39,1962,'/code/codesearch',NULL),
	(41,'vip管理','vip',-1,500,'/vip/uservip','shop'),
	(42,'vip套餐管理','uservip',41,501,'/vip/uservip','shop'),
	(43,'商家套餐设置','shopvip',11,804,'/shopmanager/shopvip','shop'),
	(49,'系统配置','sysconfig',15,1905,'/baseconfig/sysconfig',NULL),
	(50,'用户管理','user',-1,1850,'/user/userlimit','user'),
	(51,'用户已用额度','userlimit',50,1851,'/user/userlimit',NULL),
	(52,'用户黑名单','userblacklist',50,1852,'/user/userblacklist',NULL),
	(53,'异常交易','errortrade',17,1802,'/moneyinfo/errortrade',NULL),
	(54,'账户列表','recordMoneyAccountList',8,900,'/account/recordMoneyAccountList','account'),
	(55,'提现记录','moneyrecordlist',8,903,'/account/moneyrecordlist',NULL),
	(56,'订单管理','order',-1,860,'/order/orderlist','order'),
	(57,'全部订单','orderlist',56,861,'/order/orderlist',NULL),
	(58,'商家总流水','shoptransactions',17,1801,'/moneyinfo/shoptransactions',NULL),
	(60,'提现审核（融宝）','ApplyRMAccountListNew',8,902,'/account/ApplyRMAccountListNew',NULL),
	(61,'商品类别','productCategory',15,1906,'/baseconfig/productCategory',NULL),
	(63,'商品新增','productAdd',26,853,'/product/productAdd',NULL);

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
	(7,'系统管理',-1);

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
	(274,60,1);

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
	(1,'admin','123','管理员');

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
	(44,1,1);

/*!40000 ALTER TABLE `fuserrole` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

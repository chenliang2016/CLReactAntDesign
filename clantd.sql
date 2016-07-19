/*
Navicat MySQL Data Transfer

Source Server         : 115.29.232.189
Source Server Version : 50543
Source Host           : 115.29.232.189:3306
Source Database       : clantd

Target Server Type    : MYSQL
Target Server Version : 50543
File Encoding         : 65001

Date: 2016-07-19 14:14:54
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `fmenu`
-- ----------------------------
DROP TABLE IF EXISTS `fmenu`;
CREATE TABLE `fmenu` (
  `menuId` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `menuKey` varchar(50) DEFAULT NULL,
  `pmenuId` int(20) DEFAULT NULL,
  `orderNum` int(20) DEFAULT NULL,
  `tourl` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`menuId`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fmenu
-- ----------------------------
INSERT INTO `fmenu` VALUES ('3', '后台管理', 'backend', '-1', '2000', '/backend/users');
INSERT INTO `fmenu` VALUES ('4', '用户管理', 'users', '3', '2001', '/backend/users');
INSERT INTO `fmenu` VALUES ('5', '菜单管理', 'menu', '3', '2002', '/backend/menu');
INSERT INTO `fmenu` VALUES ('21', '角色管理', 'role', '3', '2003', '/backend/role');

-- ----------------------------
-- Table structure for `frole`
-- ----------------------------
DROP TABLE IF EXISTS `frole`;
CREATE TABLE `frole` (
  `roleId` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `proleId` int(20) DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of frole
-- ----------------------------

-- ----------------------------
-- Table structure for `frolemenu`
-- ----------------------------
DROP TABLE IF EXISTS `frolemenu`;
CREATE TABLE `frolemenu` (
  `roleMenuId` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `menuId` int(20) DEFAULT NULL,
  `roleId` int(20) DEFAULT NULL,
  PRIMARY KEY (`roleMenuId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of frolemenu
-- ----------------------------

-- ----------------------------
-- Table structure for `fuser`
-- ----------------------------
DROP TABLE IF EXISTS `fuser`;
CREATE TABLE `fuser` (
  `userId` int(20) NOT NULL AUTO_INCREMENT,
  `loginName` varchar(50) DEFAULT NULL,
  `loginPasw` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fuser
-- ----------------------------
INSERT INTO `fuser` VALUES ('1', 'admin', '123', '管理员');

-- ----------------------------
-- Table structure for `fuserrole`
-- ----------------------------
DROP TABLE IF EXISTS `fuserrole`;
CREATE TABLE `fuserrole` (
  `userRoleId` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `roleId` int(20) DEFAULT NULL,
  `userId` int(20) DEFAULT NULL,
  PRIMARY KEY (`userRoleId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fuserrole
-- ----------------------------

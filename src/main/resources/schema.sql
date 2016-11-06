SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT;
SET NAMES utf8mb4;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';

-- Dumping database structure for bms
CREATE DATABASE IF NOT EXISTS `bms`
  DEFAULT CHARACTER SET utf8;
USE `bms`;

-- Dumping structure for table bms.acl_class
CREATE TABLE IF NOT EXISTS `acl_class` (
  `id`    BIGINT(20)   NOT NULL AUTO_INCREMENT,
  `class` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_uk_2` (`class`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = utf8;

-- Dumping structure for table bms.acl_entry
CREATE TABLE IF NOT EXISTS `acl_entry` (
  `id`                  BIGINT(20) NOT NULL AUTO_INCREMENT,
  `acl_object_identity` BIGINT(20) NOT NULL,
  `ace_order`           INT(11)    NOT NULL,
  `sid`                 BIGINT(20) NOT NULL,
  `mask`                INT(11)    NOT NULL,
  `granting`            TINYINT(1) NOT NULL,
  `audit_success`       TINYINT(1) NOT NULL,
  `audit_failure`       TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_uk_4` (`acl_object_identity`, `ace_order`),
  KEY `foreign_fk_5` (`sid`),
  CONSTRAINT `foreign_fk_4` FOREIGN KEY (`acl_object_identity`) REFERENCES `acl_object_identity` (`id`),
  CONSTRAINT `foreign_fk_5` FOREIGN KEY (`sid`) REFERENCES `acl_sid` (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 268
  DEFAULT CHARSET = utf8;

-- Dumping structure for table bms.acl_object_identity
CREATE TABLE IF NOT EXISTS `acl_object_identity` (
  `id`                 BIGINT(20) NOT NULL AUTO_INCREMENT,
  `object_id_class`    BIGINT(20) NOT NULL,
  `object_id_identity` BIGINT(20) NOT NULL,
  `parent_object`      BIGINT(20)          DEFAULT NULL,
  `owner_sid`          BIGINT(20)          DEFAULT NULL,
  `entries_inheriting` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_uk_3` (`object_id_class`, `object_id_identity`),
  KEY `foreign_fk_1` (`parent_object`),
  KEY `foreign_fk_3` (`owner_sid`),
  CONSTRAINT `foreign_fk_1` FOREIGN KEY (`parent_object`) REFERENCES `acl_object_identity` (`id`),
  CONSTRAINT `foreign_fk_2` FOREIGN KEY (`object_id_class`) REFERENCES `acl_class` (`id`),
  CONSTRAINT `foreign_fk_3` FOREIGN KEY (`owner_sid`) REFERENCES `acl_sid` (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 32
  DEFAULT CHARSET = utf8;

-- Dumping structure for table bms.acl_sid
CREATE TABLE IF NOT EXISTS `acl_sid` (
  `id`        BIGINT(20)   NOT NULL AUTO_INCREMENT,
  `principal` TINYINT(1)   NOT NULL,
  `sid`       VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_uk_1` (`sid`, `principal`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 10
  DEFAULT CHARSET = utf8;

-- Dumping structure for table bms.appliances
CREATE TABLE IF NOT EXISTS `appliances` (
  `id`           BIGINT(20)   NOT NULL AUTO_INCREMENT,
  `hostname`     VARCHAR(255) NOT NULL,
  `ipv4_address` VARCHAR(255) NOT NULL,
  `note`         VARCHAR(500)          DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_sk2xrwi8v7wivceg4o81mxrrd` (`hostname`),
  UNIQUE KEY `UK_ep3s0prbx9c30ynrwfvt3dg1u` (`ipv4_address`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 102
  DEFAULT CHARSET = utf8;

-- Dumping structure for table bms.appliance_user
CREATE TABLE IF NOT EXISTS `appliance_user` (
  `appliance_id` BIGINT(20) NOT NULL,
  `user_id`      BIGINT(20) NOT NULL,
  KEY `FK_dcxikyr7j5xdfoe9gvvkf1mfe` (`user_id`),
  KEY `FK_3mpld7o3p1r8sbcsegpivq9qd` (`appliance_id`),
  CONSTRAINT `FK_3mpld7o3p1r8sbcsegpivq9qd` FOREIGN KEY (`appliance_id`) REFERENCES `appliances` (`id`),
  CONSTRAINT `FK_dcxikyr7j5xdfoe9gvvkf1mfe` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- Dumping structure for table bms.groups
CREATE TABLE IF NOT EXISTS `groups` (
  `id`           BIGINT(20)   NOT NULL AUTO_INCREMENT,
  `descriptsion` VARCHAR(255)          DEFAULT NULL,
  `group_name`   VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_7o859iyhxd19rv4hywgdvu2v4` (`group_name`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARSET = utf8;

-- Dumping structure for table bms.oauth_access_token
CREATE TABLE IF NOT EXISTS `oauth_access_token` (
  `token_id`          VARCHAR(255) DEFAULT NULL,
  `token`             BLOB,
  `authentication_id` VARCHAR(255) DEFAULT NULL,
  `user_name`         VARCHAR(255) DEFAULT NULL,
  `client_id`         VARCHAR(255) DEFAULT NULL,
  `authentication`    BLOB,
  `refresh_token`     VARCHAR(255) DEFAULT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- Dumping structure for table bms.oauth_client_details
CREATE TABLE IF NOT EXISTS `oauth_client_details` (
  `client_id`               VARCHAR(255) NOT NULL,
  `resource_ids`            VARCHAR(255)  DEFAULT NULL,
  `client_secret`           VARCHAR(255)  DEFAULT NULL,
  `scope`                   VARCHAR(255)  DEFAULT NULL,
  `authorized_grant_types`  VARCHAR(255)  DEFAULT NULL,
  `web_server_redirect_uri` VARCHAR(255)  DEFAULT NULL,
  `authorities`             VARCHAR(255)  DEFAULT NULL,
  `access_token_validity`   INT(11)       DEFAULT NULL,
  `refresh_token_validity`  INT(11)       DEFAULT NULL,
  `additional_information`  VARCHAR(4096) DEFAULT NULL,
  `autoapprove`             TINYINT(4)    DEFAULT NULL,
  PRIMARY KEY (`client_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- Dumping structure for table bms.oauth_client_token
CREATE TABLE IF NOT EXISTS `oauth_client_token` (
  `token_id`          VARCHAR(255) DEFAULT NULL,
  `token`             BLOB,
  `authentication_id` VARCHAR(255) DEFAULT NULL,
  `user_name`         VARCHAR(255) DEFAULT NULL,
  `client_id`         VARCHAR(255) DEFAULT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- Dumping structure for table bms.oauth_code
CREATE TABLE IF NOT EXISTS `oauth_code` (
  `code`           VARCHAR(255) DEFAULT NULL,
  `authentication` BLOB
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- Dumping structure for table bms.oauth_refresh_token
CREATE TABLE IF NOT EXISTS `oauth_refresh_token` (
  `token_id`       VARCHAR(255) DEFAULT NULL,
  `token`          BLOB,
  `authentication` BLOB
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- Dumping structure for table bms.schema_version
CREATE TABLE IF NOT EXISTS `schema_version` (
  `installed_rank` INT(11)       NOT NULL,
  `version`        VARCHAR(50)            DEFAULT NULL,
  `description`    VARCHAR(200)  NOT NULL,
  `type`           VARCHAR(20)   NOT NULL,
  `script`         VARCHAR(1000) NOT NULL,
  `checksum`       INT(11)                DEFAULT NULL,
  `installed_by`   VARCHAR(100)  NOT NULL,
  `installed_on`   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` INT(11)       NOT NULL,
  `success`        TINYINT(1)    NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `schema_version_s_idx` (`success`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- Dumping structure for table bms.users
CREATE TABLE IF NOT EXISTS `users` (
  `id`           BIGINT(20)   NOT NULL AUTO_INCREMENT,
  `authorities`  INT(11)               DEFAULT NULL,
  `built_in`     BIT(1)                DEFAULT NULL,
  `created_date` DATETIME              DEFAULT NULL,
  `email`        VARCHAR(255) NOT NULL,
  `expire_date`  DATETIME              DEFAULT NULL,
  `first_name`   VARCHAR(50)           DEFAULT NULL,
  `gender`       INT(11)               DEFAULT NULL,
  `image`        VARCHAR(255)          DEFAULT NULL,
  `last_login`   DATETIME              DEFAULT NULL,
  `last_name`    VARCHAR(50)           DEFAULT NULL,
  `password`     VARCHAR(255) NOT NULL,
  `status`       INT(11)      NOT NULL,
  `username`     VARCHAR(50)  NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 8
  DEFAULT CHARSET = utf8;

-- Dumping structure for table bms.user_groups
CREATE TABLE IF NOT EXISTS `user_groups` (
  `groups_id` BIGINT(20) NOT NULL,
  `user_id`   BIGINT(20) NOT NULL,
  PRIMARY KEY (`groups_id`, `user_id`),
  KEY `FK_qhsd8ovn89o4usyr3fgaqkdjt` (`user_id`),
  CONSTRAINT `FK_jrc4ri7j11xq29b6p2unbmn5n` FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `FK_qhsd8ovn89o4usyr3fgaqkdjt` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

SET SQL_MODE = IFNULL(@OLD_SQL_MODE, '');
SET FOREIGN_KEY_CHECKS = IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS);
SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT;

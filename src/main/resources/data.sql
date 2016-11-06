SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT;
SET NAMES utf8mb4;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';

-- Dumping data for table bms.oauth_client_details: ~1 rows (approximately)
ALTER TABLE `oauth_client_details` DISABLE KEYS;
INSERT IGNORE INTO `oauth_client_details` (`client_id`, `resource_ids`, `client_secret`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `authorities`, `access_token_validity`, `refresh_token_validity`, `additional_information`, `autoapprove`) VALUES
  ('bms', NULL, '33jJcZ4Fz3jC5Sv!E4q6JDs', 'read,write', 'password,client_credentials,refresh_token,authorization_code', NULL, NULL, 1800, 2592000, NULL, NULL);
ALTER TABLE `oauth_client_details` ENABLE KEYS;

-- Dumping data for table bms.schema_version: ~1 rows (approximately)
ALTER TABLE `schema_version` DISABLE KEYS;
INSERT IGNORE INTO `schema_version` (`installed_rank`, `version`, `description`, `type`, `script`, `checksum`, `installed_by`, `installed_on`, `execution_time`, `success`) VALUES
  (1, '0.1.0.0', '<< Flyway Baseline >>', 'BASELINE', '<< Flyway Baseline >>', NULL, 'root', '2016-10-10 23:27:25', 0, 1);
ALTER TABLE `schema_version` ENABLE KEYS;

-- Dumping data for table bms.users: ~2 rows (approximately)
ALTER TABLE `users` DISABLE KEYS;
INSERT IGNORE INTO `users` (`id`, `authorities`, `built_in`, `created_date`, `email`, `expire_date`, `first_name`, `gender`, `image`, `last_login`, `last_name`, `password`, `status`, `username`) VALUES
  (1, 514, b'1', '2016-04-17 10:25:44', 'admin@bms.com', NULL, 'Administrator', 1, '', NULL, 'BMS', '$2a$10$L.hhtvXaGvlGN.M1sl3CJe4Nr19wNCdf/9D29ibUP4p6KIJoi.oUe', 1, 'admin'),
  (2, 514, b'1', '2016-05-25 22:58:48', 'nthienan@bms.com', NULL, 'An', 1, '', NULL, 'Nguyen', '$2a$10$IzLt5/xCe//gCh3O1Ce2quO.2jS9EFTgEzl52D479Sw0CFaYv16MW', 1, 'nthienan');
ALTER TABLE `users` ENABLE KEYS;

SET SQL_MODE = IFNULL(@OLD_SQL_MODE, '');
SET FOREIGN_KEY_CHECKS = IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS);
SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT;

CREATE TABLE `oauth_client_details` (
  `client_id`               VARCHAR(255) PRIMARY KEY,
  `resource_ids`            VARCHAR(255),
  `client_secret`           VARCHAR(255),
  `scope`                   VARCHAR(255),
  `authorized_grant_types`  VARCHAR(255),
  `web_server_redirect_uri` VARCHAR(255),
  `authorities`             VARCHAR(255),
  `access_token_validity`   INTEGER,
  `refresh_token_validity`  INTEGER,
  `additional_information`  VARCHAR(4096),
  `autoapprove`             TINYINT
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `oauth_client_token` (
  `token_id`          VARCHAR(255),
  `token`             BLOB,
  `authentication_id` VARCHAR(255),
  `user_name`         VARCHAR(255),
  `client_id`         VARCHAR(255)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `oauth_access_token` (
  `token_id`          VARCHAR(255),
  `token`             BLOB,
  `authentication_id` VARCHAR(255),
  `user_name`         VARCHAR(255),
  `client_id`         VARCHAR(255),
  `authentication`    BLOB,
  `refresh_token`     VARCHAR(255)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `oauth_refresh_token` (
  `token_id`       VARCHAR(255),
  `token`          BLOB,
  `authentication` BLOB
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `oauth_code` (
  `code`         VARCHAR(255),
  authentication BLOB
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

INSERT INTO `oauth_client_details` (`client_id`, `resource_ids`, `client_secret`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `authorities`, `access_token_validity`, `refresh_token_validity`, `additional_information`, `autoapprove`)
VALUES
  ('bms', NULL, 's3cr3t', 'read,write', 'password,client_credentials,refresh_token,authorization_code', NULL, NULL, 300,
          2592000, NULL, NULL);
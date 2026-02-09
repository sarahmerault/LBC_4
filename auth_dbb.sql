

USE auth_db;

CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,

  role ENUM('USER','ADMIN','MODERATOR') NOT NULL DEFAULT 'USER',

  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  verify_token VARCHAR(36) DEFAULT NULL,

  reset_token VARCHAR(36) DEFAULT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_email (email),
  INDEX idx_verify_token (verify_token),
  INDEX idx_reset_token (reset_token)
);
CREATE TABLE urls (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  user_id BIGINT NOT NULL,

  short_code VARCHAR(20) NOT NULL UNIQUE,
  original_url TEXT NOT NULL,

  title VARCHAR(255),
  description TEXT,

  qr_code_url TEXT, -- stored QR image URL (S3 later)

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

  INDEX idx_short_code (short_code),
  INDEX idx_user_id (user_id)
);
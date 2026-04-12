CREATE TABLE click_events (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  url_id BIGINT NOT NULL,

  ip_address VARCHAR(45),
  user_agent TEXT,

  device_type ENUM('mobile','desktop','tablet','unknown'),
  browser VARCHAR(50),
  os VARCHAR(50),

  country VARCHAR(100),
  city VARCHAR(100),

  referrer TEXT,

  clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (url_id) REFERENCES urls(id) ON DELETE CASCADE,

  INDEX idx_url_id (url_id),
  INDEX idx_clicked_at (clicked_at)
);
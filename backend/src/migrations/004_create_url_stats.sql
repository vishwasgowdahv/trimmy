CREATE TABLE url_stats (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  url_id BIGINT NOT NULL UNIQUE,

  total_clicks BIGINT DEFAULT 0,
  mobile_clicks BIGINT DEFAULT 0,
  desktop_clicks BIGINT DEFAULT 0,
  tablet_clicks BIGINT DEFAULT 0,

  last_clicked_at TIMESTAMP NULL,

  FOREIGN KEY (url_id) REFERENCES urls(id) ON DELETE CASCADE
);
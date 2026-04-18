ALTER TABLE users
ADD COLUMN is_email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN email_verification_token VARCHAR(255),
ADD COLUMN email_verification_expires TIMESTAMP NULL,

ADD COLUMN reset_password_token VARCHAR(255),
ADD COLUMN reset_password_expires TIMESTAMP NULL,

ADD COLUMN refresh_token TEXT,
ADD COLUMN refresh_token_expires TIMESTAMP NULL;
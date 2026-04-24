# 🔗 Trimmy - URL Shortener Platform

Trimmy is a full-stack URL shortening platform designed with production-grade architecture, offering secure authentication, advanced analytics, and scalable backend services.

---

## 🌐 Live Demo

- Frontend: https://trimmy.vishwasgowda.com
- Backend API: https://trimmy.onrender.com

---

## ✨ Features

### 🔐 Authentication & Security

- User signup & login
- Email verification workflow
- JWT-based authentication
- Refresh token mechanism
- Password reset via email

### 🔗 URL Shortening

- Generate short URLs from long links
- QR code support for each URL
- Unique short code generation

### 📊 Analytics

- Total clicks tracking
- Device-based analytics (mobile, desktop, tablet)
- Geographic insights (country, city)
- Click event logging

### 📬 Email System

- Verification emails
- Password reset emails
- SMTP integration (Mailtrap for development)

### ⚙️ System Design

- Modular backend architecture
- Rate limiting for API requests
- Separation of concerns (controllers, models, services)
- Optimized MySQL schema with indexing
- Scalable analytics design using event + aggregated tables

---

## 🧱 Tech Stack

### Backend

- Node.js
- Express.js
- MySQL
- JWT Authentication
- Nodemailer

### Frontend

- React.js
- Tailwind CSS
- React Router DOM

### DevOps & Tools

- Docker (optional)
- Postman
- Swagger (API documentation)

---

## 📁 Project Structure

```
backend/
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── services/
│ ├── db/
│ └── migrations/
```

---

## 🧠 Architecture Overview

Client → Routes → Controllers → Services → Models → MySQL

- Controllers handle request/response
- Services manage business logic
- Models interact with database
- Migrations manage schema changes

---

## 🔑 Environment Variables

Create a `.env` file:

PORT=8000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=url_shortener

JWT_SECRET=your_secret

MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_user
MAIL_PASS=your_pass
MAIL_FROM=no-reply@trimmy.com

BASE_URL=http://localhost:8000

---

## ⚙️ Setup Instructions

### 1. Clone Repository

git clone https://github.com/yourusername/trimmy.git

cd trimmy/backend

---

### 2. Install Dependencies

npm install

---

### 3. Run Migrations

Execute SQL files inside:

src/migrations/

---

### 4. Start Server

npm run dev

---

## 📊 API Documentation

Swagger docs available at:

/api-docs

---

## 📦 Future Enhancements

- Link expiration
- Password-protected URLs
- Redis caching
- Background jobs (email queue)

---

## 📈 Performance Considerations

- Indexed short_code for fast lookup
- Separate analytics table for scalability
- Aggregated stats to avoid heavy queries

---

## 🧑‍💻 Author

**Vishwasgowdahv**

- GitHub: https://github.com/vishwasgowdahv
- LinkedIn: https://linkedin.com/in/vishwasgowdahv

---

## 📜 License

MIT License

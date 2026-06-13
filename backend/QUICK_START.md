# Quick Start Guide

## 🚀 Fast Setup (5 minutes)

### 1. Create Database & Tables
```powershell
mysql -u root -p
# Leave password blank and press Enter

# Inside MySQL:
source backend/database.sql
EXIT
```

### 2. Install Dependencies
```powershell
cd backend
npm install
```

### 3. Start Backend Server
```powershell
npm start
# Output: Server running on http://localhost:5000
```

### 4. Start Frontend Server (New Terminal)
```powershell
cd ..  # Go back to main directory
python -m http.server 8000
# Or: http-server -p 8000
```

### 5. Open in Browser
- **Frontend**: http://localhost:8000
- **API**: http://localhost:5000/api/product

---

## 📋 What's Connected

✅ **Contact Form** (contact.html)
- Form submits to `/api/contact`
- Data saved to MySQL `contacts` table

✅ **Products Page** (product.html)
- Dynamically loads from `/api/product`
- Displays from MySQL `products` table

✅ **Services Page** (services.html)
- Dynamically loads from `/api/service`
- Displays from MySQL `services` table

---

## 🔧 Common Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Start backend server |
| `npm run dev` | Start with auto-reload |
| `npm install` | Install dependencies |
| `mysql -u root -p` | Open MySQL |

---

## 💾 Database Tables

**contacts**
- id, name, email, phone, message, created_at

**products**
- id, name, description, price, created_at, updated_at

**services**
- id, name, description, price, created_at, updated_at

---

## 🐛 Quick Fixes

| Issue | Solution |
|-------|----------|
| MySQL connection error | Start MySQL: `net start MySQL80` |
| Module not found | Run: `npm install` |
| Products not showing | Ensure backend running on port 5000 |
| CORS error | Restart both servers |

---

## 📡 API Examples

**Get All Products:**
```bash
curl http://localhost:5000/api/product
```

**Get All Services:**
```bash
curl http://localhost:5000/api/service
```

**Get All Contacts:**
```bash
curl http://localhost:5000/api/contact
```

---

## 📁 File Structure

```
backend/
├── server.js ..................... Main server (Express)
├── config/database.js ............ MySQL connection
├── routes/contact.js ............. Contact endpoints
├── routes/product.js ............. Product endpoints
├── routes/service.js ............. Service endpoints
├── controllers/ .................. Business logic
├── .env .......................... Configuration
├── database.sql .................. Database schema
└── package.json .................. Dependencies
```

---

**Backend is ready to use!** 🎉

# Dummy Website - Backend Setup Guide

## Project Structure

```
Dummy-Website/
├── backend/
│   ├── config/
│   │   └── database.js          # MySQL connection configuration
│   ├── controllers/
│   │   ├── contactController.js # Contact form logic
│   │   ├── productController.js # Product CRUD operations
│   │   └── serviceController.js # Service CRUD operations
│   ├── routes/
│   │   ├── contact.js           # Contact endpoints
│   │   ├── product.js           # Product endpoints
│   │   └── service.js           # Service endpoints
│   ├── .env                     # Environment variables
│   ├── server.js                # Main Express server
│   ├── package.json             # Dependencies
│   └── database.sql             # Database schema & sample data
├── index.html
├── contact.html                 # Updated with API integration
├── product.html                 # Updated with dynamic loading
├── services.html                # Updated with dynamic loading
├── about.html
├── css/
│   └── style.css
└── FirstClass.java
```

---

## Prerequisites

Before starting, install the following:

1. **Node.js** (v14 or higher) - https://nodejs.org/
2. **MySQL Server** - https://dev.mysql.com/downloads/mysql/
3. **MySQL Workbench** (optional, for GUI management) - https://dev.mysql.com/downloads/workbench/

---

## Step 1: Setup MySQL Database

### Option A: Using MySQL Command Line

1. **Open MySQL Command Line:**
   ```powershell
   mysql -u root -p
   ```
   (Leave password blank if no password is set)

2. **Create database and tables:**
   ```bash
   # Copy and paste the entire content of backend/database.sql
   # Or run:
   source D:\My Projects\Dummy-Website\backend\database.sql
   ```

### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Click "File" → "Open SQL Script"
3. Select `backend/database.sql`
4. Execute (Ctrl + Enter or click Execute button)

### Verify Database Setup

```sql
USE dummy_website;
SHOW TABLES;
SELECT * FROM contacts;
SELECT * FROM products;
SELECT * FROM services;
```

---

## Step 2: Install Backend Dependencies

1. **Open PowerShell**
2. **Navigate to backend folder:**
   ```powershell
   cd "D:\My Projects\Dummy-Website\backend"
   ```

3. **Install dependencies:**
   ```powershell
   npm install
   ```

This will install:
- `express` - Web framework
- `mysql2` - MySQL driver
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables
- `body-parser` - Parse request bodies
- `nodemon` - Auto-reload (dev dependency)

---

## Step 3: Configure Environment Variables

The `.env` file is already configured with default values:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=dummy_website
PORT=5000
```

**If your MySQL has a password**, update `.env`:
```
DB_PASSWORD=your_mysql_password
```

---

## Step 4: Start the Backend Server

**In PowerShell (from backend folder):**

```powershell
# Using npm start
npm start

# OR using nodemon for development (auto-reload):
npm run dev
```

**Expected output:**
```
Server running on http://localhost:5000
Health check: http://localhost:5000/api/health
```

---

## API Endpoints

### Health Check
```
GET http://localhost:5000/api/health
```

### Contact Endpoints
```
POST /api/contact                 # Submit contact form
GET  /api/contact                 # Get all contacts
GET  /api/contact/:id             # Get single contact
DELETE /api/contact/:id           # Delete contact
```

**POST /api/contact - Example:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "message": "Hello, I'm interested in your services"
}
```

### Product Endpoints
```
GET  /api/product                 # Get all products
GET  /api/product/:id             # Get single product
POST /api/product                 # Create product (admin)
PUT  /api/product/:id             # Update product (admin)
DELETE /api/product/:id           # Delete product (admin)
```

**POST /api/product - Example:**
```json
{
  "name": "New Product",
  "description": "Product description here",
  "price": 299.99
}
```

### Service Endpoints
```
GET  /api/service                 # Get all services
GET  /api/service/:id             # Get single service
POST /api/service                 # Create service (admin)
PUT  /api/service/:id             # Update service (admin)
DELETE /api/service/:id           # Delete service (admin)
```

---

## Testing the API

### Using Postman (Recommended)

1. **Download Postman**: https://www.postman.com/downloads/
2. **Test endpoints:**
   - Create new request
   - Method: GET
   - URL: `http://localhost:5000/api/product`
   - Click "Send"

### Using cURL (Command Line)

```powershell
# Get all products
Invoke-WebRequest -Uri "http://localhost:5000/api/product" -Method GET

# Get all services
Invoke-WebRequest -Uri "http://localhost:5000/api/service" -Method GET

# Get all contacts
Invoke-WebRequest -Uri "http://localhost:5000/api/contact" -Method GET
```

### Using Browser

Simply visit in your browser:
- http://localhost:5000/api/product
- http://localhost:5000/api/service
- http://localhost:5000/api/health

---

## Frontend Integration

The HTML files are already updated:

### contact.html
- **Form submission** sends data to `/api/contact`
- Shows success/error message
- Form resets after submission

### product.html
- **Loads dynamically** from `/api/product`
- Displays product name, description, and price

### services.html
- **Loads dynamically** from `/api/service`
- Displays service name, description, and price

---

## Running Both Frontend and Backend

### Terminal 1 - Start Backend Server:
```powershell
cd "D:\My Projects\Dummy-Website\backend"
npm start
```

### Terminal 2 - Start Frontend:

**Option A: Using Python (if installed):**
```powershell
cd "D:\My Projects\Dummy-Website"
python -m http.server 8000
```

**Option B: Using Node.js Simple HTTP Server:**
```powershell
npm install -g http-server
cd "D:\My Projects\Dummy-Website"
http-server -p 8000
```

**Then open in browser:**
- Frontend: http://localhost:8000
- Backend API: http://localhost:5000/api/product

---

## Troubleshooting

### Error: "Cannot find module 'express'"
```powershell
npm install
```

### Error: "connect ECONNREFUSED 127.0.0.1:3306"
- **MySQL is not running.** Start MySQL service:
  ```powershell
  # Windows
  net start MySQL80
  
  # Or restart MySQL from Services
  ```

### Error: "Unknown database 'dummy_website'"
- Run the `database.sql` file again to create database and tables

### Error: "CORS error" in browser console
- Backend server might not be running
- Ensure `npm start` is running on port 5000

### Products/Services not loading on website
1. Make sure backend is running: `npm start`
2. Check browser console (F12 → Console tab) for errors
3. Verify database has sample data: `SELECT * FROM products;`

---

## Database Management

### Add Sample Data
```sql
INSERT INTO products (name, description, price) VALUES 
('New Product', 'Description here', 499.99);

INSERT INTO services (name, description, price) VALUES 
('New Service', 'Description here', 199.99);
```

### View All Data
```sql
USE dummy_website;
SELECT * FROM contacts;
SELECT * FROM products;
SELECT * FROM services;
```

### Delete All Contacts
```sql
DELETE FROM contacts;
```

---

## Deployment (Advanced)

To deploy to production, see:
- **Heroku**: https://devcenter.heroku.com/articles/getting-started-with-nodejs
- **AWS**: https://aws.amazon.com/getting-started/hands-on/deploy-nodejs-web-app/
- **DigitalOcean**: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04

---

## Support

If you encounter any issues:
1. Check the error message in the terminal
2. Verify MySQL is running
3. Ensure backend dependencies are installed (`npm install`)
4. Check `.env` file configuration
5. Review the API response in browser developer tools (F12)

---

**Created:** June 2026
**Backend:** Node.js + Express
**Database:** MySQL
**API:** REST API

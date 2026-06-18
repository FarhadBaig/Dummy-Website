-- Create database
CREATE DATABASE IF NOT EXISTS dummy_website;
USE dummy_website;

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name)
);

-- Services table
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2)
);

-- Sample data for products
INSERT INTO products (name, description, price) VALUES
('Product One', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. now you let me see u again in the form of adventure', 299.99),
('Product Two', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. now you let me see u again in the form of adventure', 399.99),
('Product Three', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. now you let me see u again in the form of adventure', 499.99),
('Product Four', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. now you let me see u again in the form of adventure', 599.99),
('Product Five', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. now you let me see u again in the form of adventure', 699.99),
('Product Six', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. now you let me see u again in the form of adventure', 799.99);

-- Sample data for services
INSERT INTO services (name, description, price)
VALUES
('Web Development', 'Professional website development services', 499.99),
('Mobile App Development', 'Android and iOS applications', 799.99),
('SEO Optimization', 'Improve search engine ranking', 299.99);
-- Terminal 1 (Keep Open):
-- $ npm start
-- → Server running on http://localhost:5000

-- Terminal 2:
-- $ python -m http.server 8000
-- → Serving HTTP on port 8000

-- Browser:
-- → http://localhost:8000 (Website)
-- → http://localhost:5000/api/product (API)

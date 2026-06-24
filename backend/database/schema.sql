-- Pizza Planet — Complete Database Schema
-- Run: mysql -u root -p < database/schema.sql

CREATE DATABASE IF NOT EXISTS pizza_planet;
USE pizza_planet;

-- USERS (customers + admin)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('customer','admin') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ADDRESSES (saved for logged-in users)
CREATE TABLE IF NOT EXISTS addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  label VARCHAR(100) DEFAULT 'Home',
  address TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(50) NOT NULL UNIQUE,
  label VARCHAR(100) NOT NULL,
  emoji VARCHAR(10) DEFAULT '',
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MENU ITEMS
CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_code VARCHAR(50) NOT NULL UNIQUE,
  category_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  emoji VARCHAR(10) DEFAULT '',
  description TEXT,
  tags JSON,
  note TEXT,
  price DECIMAL(10,2) DEFAULT NULL,
  has_sizes BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  image_url VARCHAR(500),
  rating DECIMAL(2,1) DEFAULT 4.5,
  review_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- ITEM SIZES
CREATE TABLE IF NOT EXISTS item_sizes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  menu_item_id INT NOT NULL,
  size_key VARCHAR(20) NOT NULL,
  label VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  order_number VARCHAR(20) NOT NULL UNIQUE,
  status ENUM('pending','confirmed','preparing','ready','out_for_delivery','delivered','cancelled') DEFAULT 'pending',
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  delivery_address TEXT NOT NULL,
  customer_name VARCHAR(200),
  customer_phone VARCHAR(20),
  customer_email VARCHAR(200),
  special_instructions TEXT,
  is_paid BOOLEAN DEFAULT FALSE,
  payment_method VARCHAR(50) DEFAULT 'cash',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ORDER ITEMS
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_item_id INT,
  item_name VARCHAR(200) NOT NULL,
  item_emoji VARCHAR(10),
  size_label VARCHAR(50),
  unit_price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  subtotal DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE SET NULL
);

-- ORDER STATUS HISTORY
CREATE TABLE IF NOT EXISTS order_status_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- SEED DATA

-- Admin user (password: admin123)
INSERT INTO users (name, email, phone, password, role) VALUES
('Admin', 'admin@pizzaplanet.com', '03000000000', '$2b$10$fnO86Ppw.eC1KuLaVReNMObKP2krxFINaQyNYRVhsF2tRDPS1GEI.', 'admin');

-- Categories
INSERT INTO categories (slug, label, emoji, display_order) VALUES
('combos', 'Combo Deals', '🎁', 1),
('meals', 'Meal Deals', '🍱', 2),
('starters', 'Starters', '🍗', 3),
('pasta', 'Pasta', '🍝', 4),
('chinese', 'Chinese', '🥡', 5),
('rice', 'Rice', '🍚', 6),
('pizza', 'Pizza Flavours', '🍕', 7),
('special', 'Special Flavours', '🔥', 8),
('premium', 'Premium Flavours', '👑', 9),
('treats', 'Treat on Planet', '🎉', 10),
('burgers', 'Burgers & Wraps', '🍔', 11);
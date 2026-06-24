# 🍕 Pizza Planet — Full Stack Food Ordering Website

React.js frontend + Node.js/Express backend + MySQL database.

## Project Structure

```
pizza-planet-react/
├── index.html              # Entry HTML
├── package.json            # Frontend dependencies
├── vite.config.js          # Vite config with API proxy
├── public/
│   └── images/             # 11 food images
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Root component
│   ├── components/         # 12 React components
│   │   ├── Header.jsx      # Navbar + cart icon + mobile menu
│   │   ├── Hero.jsx        # Hero banner
│   │   ├── TrustBar.jsx    # Stats bar
│   │   ├── Menu.jsx        # Menu section (search + filters + grid)
│   │   ├── MenuCard.jsx    # Individual menu item card
│   │   ├── About.jsx       # About section
│   │   ├── Reviews.jsx     # Testimonial carousel
│   │   ├── VIPClub.jsx     # Membership signup
│   │   ├── Contact.jsx     # Contact form + info
│   │   ├── Footer.jsx      # Footer
│   │   ├── CartDrawer.jsx  # Slide-out cart
│   │   ├── ToastContainer.jsx  # Toast notifications
│   │   └── BackToTop.jsx   # Scroll-to-top button
│   ├── contexts/           # React Context providers
│   │   ├── CartContext.jsx
│   │   ├── ToastContext.jsx
│   │   └── WishlistContext.jsx
│   ├── data/
│   │   └── menu-data.js    # 73 menu items, 12 categories
│   └── styles/             # 6 CSS files (same as original)
├── backend/
│   ├── server.js           # Express server entry
│   ├── package.json        # Backend dependencies
│   ├── .env                # Environment config
│   ├── config/
│   │   └── db.js           # MySQL connection pool
│   ├── routes/
│   │   ├── menu.js         # Menu API endpoints
│   │   └── orders.js       # Orders API endpoints
│   └── database/
│       └── schema.sql      # MySQL schema + seed data
```

## Features

### Frontend (React)
- 🍕 Full menu with 73 items across 12 categories
- 🔍 Real-time search filtering
- 🛒 Cart system with quantity controls, delivery fee, WhatsApp checkout
- ❤️ Wishlist (persists across sessions)
- 🔔 Toast notifications
- ⭐ Star ratings with review counts
- 📱 Fully responsive (mobile hamburger menu)
- 🎨 Same dark premium design as original

### Backend (Express + MySQL)
- 📋 Menu items API with category filtering
- 📦 Order creation with auto-generated order numbers
- 👤 Customer tracking (phone-based)
- 📊 Order status history
- 🔄 Transaction-safe order processing

## Setup

### 1. Database (MySQL)

```bash
# Install MySQL if not already installed
# Create the database and tables:
mysql -u root -p < backend/database/schema.sql
```

### 2. Backend

```bash
cd backend
cp .env .env.local   # Edit .env with your MySQL credentials
npm install
npm start            # Runs on http://localhost:5000
```

### 3. Frontend

```bash
cd ..                # Back in pizza-planet-react/
npm install
npm run dev          # Runs on http://localhost:3000
```

### 4. Open

```
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/menu/categories` | All menu categories |
| GET | `/api/menu/items` | All menu items (optional `?category=slug`) |
| GET | `/api/menu/items/:id` | Single menu item |
| POST | `/api/orders` | Create new order |
| GET | `/api/orders` | List orders (optional `?phone=`) |
| GET | `/api/orders/:id` | Track order (by ID or order number) |
| PATCH | `/api/orders/:id/status` | Update order status |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Backend server port |
| `DB_HOST` | `localhost` | MySQL host |
| `DB_PORT` | `3306` | MySQL port |
| `DB_USER` | `root` | MySQL user |
| `DB_PASSWORD` | `your_password` | MySQL password |
| `DB_NAME` | `pizza_planet` | Database name |

## Requirements

- **Node.js** 18+
- **MySQL** 8.0+
- **npm** 9+

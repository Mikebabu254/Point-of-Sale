# POINT-OF-SALE

## ABOUT

## 📁 BACKEND STRUCTURE
<pre>
  backend/
    ├── Controllers/
    │   ├── authController.js
    │   ├── shopController.js
    │   ├── productController.js
    │   └── orderController.js
    ├── Models/
    │   ├── Shop.js
    │   ├── User.js
    │   ├── Product.js
    │   └── Order.js
    ├── Routes/
    │   ├── authRoutes.js
    │   ├── shopRoutes.js
    │   ├── productRoutes.js
    │   └── orderRoutes.js
    ├── Middleware/
    │   ├── authMiddleware.js
    │   └── roleMiddleware.js
    ├── .env
    ├── .gitignore
    ├── index.js
</pre>

## 📁FRONTEND
<!-- <pre>
  frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── context/
    │   ├── routes/
    │   │   ├── admin/
    │   │   ├── owner/
    │   │   ├── cashier/
    │   │   ├── auth/
    │   ├── services
    │   ├── utils/
    │   ├── App.js
    │   ├── main.js
    ├── .env
    ├── package.json
</pre> -->
<pre>
  frontend/
  ├── public/
  │   └── favicon.ico
  ├── src/
  │   ├── components/
  │   │   ├── Navbar.jsx
  │   │   ├── Sidebar.jsx
  │   │   ├── ProductCard.jsx
  │   │   └── OrderSummary.jsx
  │   ├── pages/
  │   │   ├── Login.jsx
  │   │   ├── Dashboard.jsx
  │   │   ├── Products.jsx
  │   │   ├── Orders.jsx
  │   │   └── Settings.jsx
  │   ├── services/
  │   │   ├── api.js      # Axios instance for API calls
  │   │   └── auth.js     # Auth-related API functions
  │   ├── App.jsx
  │   ├── main.jsx
  │   ├── App.css
  │   └── index.css
  ├── .env
  ├── package.json
  └── vite.config.js
</pre>


# Summary of Model Relationships
- *User* belongs to a shop
- *Product* belongs to a shop
- *Order* belongs to a *Shop* and a *User*(Cashier)
- All data is scoped by shopId to ensure multi-tenancy
- Admin can oversee everything



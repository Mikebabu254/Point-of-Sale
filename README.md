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


# Summary of Model Relationships
- *User* belongs to a shop
- *Product* belongs to a shop
- *Order* belongs to a *Shop* and a *User*(Cashier)
- All data is scoped by shopId to ensure multi-tenancy
- Admin can oversee everything

## 📁FRONTEND
<pre>
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

</pre>



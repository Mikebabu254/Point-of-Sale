# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

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



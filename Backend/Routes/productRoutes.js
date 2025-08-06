const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes here are protected
router.use(authMiddleware);

// Route: POST /api/products
router.post('/', createProduct);

// Route: GET /api/products
router.get('/', getProducts);

module.exports = router;

const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../Controllers/orderControllers');
const authMiddleware = require('../Middleware/authMiddleware');

// All routes here are protected
router.use(authMiddleware);

// Route: POST /api/orders
router.post('/', createOrder);

// Route: GET /api/orders
router.get('/', getOrders);

module.exports = router;

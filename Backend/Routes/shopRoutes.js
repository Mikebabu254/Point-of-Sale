const express = require('express');
const router = express.Router();
const { createShop } = require('../controllers/shopController');

// Route: POST /api/shops
router.post('/', createShop);

module.exports = router;

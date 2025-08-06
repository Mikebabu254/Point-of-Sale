const express = require('express');
const router = express.Router();
const { createShop } = require('../controllers/shopController');

router.post('/', createShop);

module.exports = router; // ✅ Must be included

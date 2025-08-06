const Product = require('../models/Product');

// Create product
const createProduct = async (req, res) => {
  try {
    const { name, barcode, price, stock, category } = req.body;
    const shopId = req.user.shopId; // From JWT

    const existing = await Product.findOne({ barcode, shop: shopId });
    if (existing) return res.status(400).json({ message: 'Product already exists' });

    const product = new Product({ name, barcode, price, stock, category, shop: shopId });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create product', error: err.message });
  }
};

// List products for a shop
const getProducts = async (req, res) => {
  try {
    const shopId = req.user.shopId;
    const products = await Product.find({ shop: shopId });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get products', error: err.message });
  }
};

module.exports = { createProduct, getProducts };

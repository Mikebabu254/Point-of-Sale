const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const shopId = req.user.shopId;
    const cashierId = req.user.userId;

    let total = 0;

    // Update stock and calculate total
    for (const item of items) {
      const product = await Product.findOne({ _id: item.productId, shop: shopId });
      if (!product) return res.status(404).json({ message: 'Product not found' });

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();

      item.price = product.price;
      total += product.price * item.quantity;
    }

    const order = new Order({ shop: shopId, cashier: cashierId, items, total });
    await order.save();

    res.status(201).json({ message: 'Order placed', order });
  } catch (err) {
    res.status(500).json({ message: 'Order failed', error: err.message });
  }
};

// Get orders for shop
const getOrders = async (req, res) => {
  try {
    const shopId = req.user.shopId;
    const orders = await Order.find({ shop: shopId }).populate('cashier', 'username').sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

module.exports = { createOrder, getOrders };

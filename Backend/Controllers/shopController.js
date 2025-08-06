const Shop = require('../Models/shopModel');

const createShop = async (req, res) => {
  try {
    const { name, address} = req.body;

    const existing = await Shop.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Shop already exists' });

      const shop = new Shop({
        name,
        address
        });
        await shop.save();
        return res.status(201).json({ message: 'Shop created successfully', shop });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
    
  }
};

module.exports = {createShop};
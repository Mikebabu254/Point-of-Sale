const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
  });

  // const Shop = mongoose.model('Shop', shopSchema);
  // module.exports = mongoose.model('Shop', shopSchema);

  // Prevent OverwriteModelError by checking if model exists
const Shop = mongoose.models.Shop || mongoose.model('Shop', shopSchema);

module.exports = Shop;
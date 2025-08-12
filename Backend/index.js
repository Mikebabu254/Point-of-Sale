const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/shops', require('./routes/shopRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Root
app.get('/', (req, res) => {
  res.send('POS API is running...');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
});

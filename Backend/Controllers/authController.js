const db = require('../config/db'); // mysql2 connection pool
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// REGISTER USER
const registerUser = (req, res) => {
  const { username, password, role, shopId } = req.body;

  // Check if shop exists
  db.query('SELECT * FROM shops WHERE id = ?', [shopId], async (err, shopResults) => {
    if (err) return res.status(500).json({ message: err.message });
    if (shopResults.length === 0) return res.status(404).json({ message: 'Shop not found' });

    // Check if username exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, userResults) => {
      if (err) return res.status(500).json({ message: err.message });
      if (userResults.length > 0) return res.status(400).json({ message: 'Username already exists' });

      // Hash password and insert user
      const passwordHash = await bcrypt.hash(password, 10);
      db.query(
        'INSERT INTO users (username, password_hash, role, shop_id) VALUES (?, ?, ?, ?)',
        [username, passwordHash, role, shopId],
        (err, result) => {
          if (err) return res.status(500).json({ message: err.message });
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  });
};

// LOGIN USER
const loginUser = (req, res) => {
  const { username, password } = req.body;

  // Find user and join with shop
  const query = `
    SELECT u.*, s.name as shop_name 
    FROM users u 
    LEFT JOIN shops s ON u.shop_id = s.id 
    WHERE u.username = ?
  `;
  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { userId: user.id, role: user.role, shopId: user.shop_id },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        shop: user.shop_name
      }
    });
  });
};

module.exports = { registerUser, loginUser };

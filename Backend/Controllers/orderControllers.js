const db = require('../config/db'); // mysql2 connection pool

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const shopId = req.user.shopId;
    const cashierId = req.user.userId;

    let total = 0;

    // Begin transaction
    db.getConnection((err, connection) => {
      if (err) return res.status(500).json({ message: err.message });

      connection.beginTransaction(async (err) => {
        if (err) return res.status(500).json({ message: err.message });

        try {
          // Check stock and calculate total
          for (const item of items) {
            const [product] = await new Promise((resolve, reject) => {
              connection.query(
                'SELECT * FROM products WHERE id = ? AND shop_id = ?',
                [item.productId, shopId],
                (err, results) => {
                  if (err) reject(err);
                  else resolve(results);
                }
              );
            });

            if (!product) throw new Error(`Product not found`);
            if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);

            total += product.price * item.quantity;

            // Update stock
            await new Promise((resolve, reject) => {
              connection.query(
                'UPDATE products SET stock = stock - ? WHERE id = ?',
                [item.quantity, item.productId],
                (err) => (err ? reject(err) : resolve())
              );
            });
          }

          // Insert order
          const orderResult = await new Promise((resolve, reject) => {
            connection.query(
              'INSERT INTO orders (shop_id, cashier_id, total) VALUES (?, ?, ?)',
              [shopId, cashierId, total],
              (err, result) => (err ? reject(err) : resolve(result))
            );
          });

          const orderId = orderResult.insertId;

          // Insert order items
          for (const item of items) {
            await new Promise((resolve, reject) => {
              connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.productId, item.quantity, item.price],
                (err) => (err ? reject(err) : resolve())
              );
            });
          }

          // Commit transaction
          connection.commit((err) => {
            if (err) throw err;
            connection.release();
            res.status(201).json({ message: 'Order placed', orderId, total });
          });

        } catch (error) {
          connection.rollback(() => {
            connection.release();
            res.status(400).json({ message: 'Order failed', error: error.message });
          });
        }
      });
    });

  } catch (err) {
    res.status(500).json({ message: 'Order failed', error: err.message });
  }
};

// GET ORDERS FOR SHOP
const getOrders = (req, res) => {
  const shopId = req.user.shopId;

  const query = `
    SELECT o.id as order_id, o.total, o.created_at, u.username as cashier_name
    FROM orders o
    LEFT JOIN users u ON o.cashier_id = u.id
    WHERE o.shop_id = ?
    ORDER BY o.created_at DESC
  `;

  db.query(query, [shopId], (err, orders) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
    res.json(orders);
  });
};

module.exports = { createOrder, getOrders };

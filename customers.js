const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../db');

// GET all customers
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM users');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: 'DB Error', details: err.message });
  }
});

// GET specific customer + order count
router.get('/:id', async (req, res) => {
  const customerId = parseInt(req.params.id);
  if (isNaN(customerId)) {
    return res.status(400).json({ error: 'Invalid customer ID' });
  }

  try {
    const pool = await poolPromise;

    // Fetch user
    const userResult = await pool
      .request()
      .input('id', sql.Int, customerId)
      .query('SELECT * FROM users WHERE id = @id');

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const user = userResult.recordset[0];

    // Fetch order count
    const countResult = await pool
      .request()
      .input('id', sql.Int, customerId)
      .query('SELECT COUNT(*) AS order_count FROM orders WHERE user_id = @id');

    user.order_count = countResult.recordset[0].order_count;
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'DB Error', details: err.message });
  }
});

module.exports = router;

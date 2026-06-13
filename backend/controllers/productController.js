const pool = require('../config/database');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [products] = await connection.execute('SELECT * FROM products ORDER BY id DESC');
    connection.release();

    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    connection.release();

    if (product.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ success: true, data: product[0] });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch product', details: error.message });
  }
};

// Create product (admin)
exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ error: 'name, description, and price are required' });
  }

  try {
    const connection = await pool.getConnection();
    const query = 'INSERT INTO products (name, description, price) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [name, description, price]);
    connection.release();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
};

// Update product (admin)
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = 'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?';
    const [result] = await connection.execute(query, [name, description, price, id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
};

// Delete product (admin)
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to delete product', details: error.message });
  }
};

const pool = require('../config/database');

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [services] = await connection.execute('SELECT * FROM services ORDER BY id DESC');
    connection.release();

    res.json({ success: true, data: services });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch services', details: error.message });
  }
};

// Get service by ID
exports.getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    const [service] = await connection.execute('SELECT * FROM services WHERE id = ?', [id]);
    connection.release();

    if (service.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ success: true, data: service[0] });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch service', details: error.message });
  }
};

// Create service (admin)
exports.createService = async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ error: 'name, description, and price are required' });
  }

  try {
    const connection = await pool.getConnection();
    const query = 'INSERT INTO services (name, description, price) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [name, description, price]);
    connection.release();

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to create service', details: error.message });
  }
};

// Update service (admin)
exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = 'UPDATE services SET name = ?, description = ?, price = ? WHERE id = ?';
    const [result] = await connection.execute(query, [name, description, price, id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ success: true, message: 'Service updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to update service', details: error.message });
  }
};

// Delete service (admin)
exports.deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('DELETE FROM services WHERE id = ?', [id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to delete service', details: error.message });
  }
};

const pool = require('../config/database');

// Submit contact form
exports.submitContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const connection = await pool.getConnection();
    const query = 'INSERT INTO contacts (name, email, phone, message, created_at) VALUES (?, ?, ?, ?, NOW())';
    const [result] = await connection.execute(query, [name, email, phone, message]);
    connection.release();

    res.status(201).json({
      success: true,
      message: 'Contact submitted successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to submit contact', details: error.message });
  }
};

// Get all contacts (for admin panel)
exports.getAllContacts = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [contacts] = await connection.execute('SELECT * FROM contacts ORDER BY created_at DESC');
    connection.release();

    res.json({ success: true, data: contacts });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts', details: error.message });
  }
};

// Get single contact by ID
exports.getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    const [contact] = await connection.execute('SELECT * FROM contacts WHERE id = ?', [id]);
    connection.release();

    if (contact.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ success: true, data: contact[0] });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch contact', details: error.message });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('DELETE FROM contacts WHERE id = ?', [id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to delete contact', details: error.message });
  }
};

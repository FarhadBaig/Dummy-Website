const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Farhad@1010',
    database: 'dummy_website'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Database connected successfully');
});

// Product API
app.get('/api/product', (req, res) => {
    db.query('SELECT * FROM product', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: 'Database query failed'
            });
        }

        res.json({
            success: true,
            data: results
        });
    });
});

// Contact API
app.post('/api/contact', (req, res) => {
    console.log('Contact Form Data:', req.body);

    res.json({
        success: true,
        message: 'Contact form submitted successfully'
    });
});

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
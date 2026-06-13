const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST - Submit contact form
router.post('/', contactController.submitContact);

// GET - Get all contacts
router.get('/', contactController.getAllContacts);

// GET - Get single contact by ID
router.get('/:id', contactController.getContactById);

// DELETE - Delete contact
router.delete('/:id', contactController.deleteContact);

module.exports = router;

const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// GET - Get all services
router.get('/', serviceController.getAllServices);

// GET - Get service by ID
router.get('/:id', serviceController.getServiceById);

// POST - Create service
router.post('/', serviceController.createService);

// PUT - Update service
router.put('/:id', serviceController.updateService);

// DELETE - Delete service
router.delete('/:id', serviceController.deleteService);

module.exports = router;

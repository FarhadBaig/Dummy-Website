const serviceHTML = `
<div class="service-card">
    <div class="service-content">
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <div class="service-footer">
            <span class="price">$${parseFloat(service.price).toFixed(2)}</span>
            <button class="btn">Learn More</button>
        </div>
    </div>
</div>
`;
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

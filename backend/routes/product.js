const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET - Get all products
router.get('/', productController.getAllProducts);

// GET - Get product by ID
router.get('/:id', productController.getProductById);

// POST - Create product
router.post('/', productController.createProduct);

// PUT - Update product
router.put('/:id', productController.updateProduct);

// DELETE - Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;

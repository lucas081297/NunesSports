const express = require('express');
const router = express.Router();
const control = require('../controllers/produtosControllers')

router.get('/all', control.getAllProducts);
router.post('/add', control.addProduct);
router.post('/edit', control.editProduct);
router.post('/delete', control.deleteProduct);

module.exports = router

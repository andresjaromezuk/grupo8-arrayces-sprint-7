const express = require('express');
const router = express.Router();
const productApiController = require('../../controller/API/productApiController');

router.get('/', productApiController.list)
router.get('/lastProduct', productApiController.lastProduct)
router.get('/search', productApiController.search)
router.get('/:id', productApiController.detail)

module.exports = router;
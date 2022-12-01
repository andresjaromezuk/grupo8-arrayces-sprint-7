const express = require('express');
const router = express.Router();
const productApiController = require('../../controller/API/productApiController');

router.get('/', productApiController.list)

router.get('/list', productApiController.listWithPage)

router.get('/filter', productApiController.filter)

router.get('/search', productApiController.search)

router.get('/lastProduct', productApiController.lastProduct)

router.post('/', productApiController.store)

router.post('/image', productApiController.storeImage)

router.get('/:id', productApiController.detail)

router.delete('/delete/:id', productApiController.destroy)

module.exports = router;
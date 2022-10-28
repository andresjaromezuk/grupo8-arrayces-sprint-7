const express = require('express');
const router = express.Router();
const userApiController = require('../../controller/API/userApiController');

router.get('/', userApiController.list)
router.get('/:id', userApiController.detail)

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

/* ------------ REQUERIMOS MIDDLEWARE ------------ */
const multerMiddleware = require('../middleware/middlemulter')
const userCreateValidation = require('../middleware/userCreateValidation')
const userEditValidation = require('../middleware/userEditValidation')
const upload = multerMiddleware('images/users', 'user')
const authMiddleware = require('../middleware/authMiddleware')
const guestMiddleware = require('../middleware/guestMiddleware')

router.get('/register', guestMiddleware,  userController.register)
router.post('/register', upload.single('avatar'), userCreateValidation, userController.processRegister)

router.get('/login', guestMiddleware, userController.login)
router.post('/login', userController.processLogin)

router.get('/profile', authMiddleware, userController.profile)  

router.get('/edit', authMiddleware, userController.edit) 

router.put('/edit', upload.single('avatar'), userEditValidation, userController.update) 

router.get("/logout", userController.logout)

router.get('/cart', userController.cart)


module.exports = router; 

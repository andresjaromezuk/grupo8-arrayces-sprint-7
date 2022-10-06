const { body } = require('express-validator')
const path = require('path')

const userCreateValidation = [

    body('firstName')
        .notEmpty().withMessage('Debes poner tu Nombre'),
    
    body('lastName')
        .notEmpty().withMessage('Debes poner tu Apellido'),
    
    body('userName')
        .notEmpty().withMessage('Debes poner un nombre de usuario').bail()
        .isLength({min: 5}).withMessage('Debe tener un mínimo de 5 caracteres'),

    body('email')
        .notEmpty().withMessage('Debes poner tu correo electrónico').bail()
        .isEmail().withMessage('Debes respetar el formato de correo electrónico'),
    
    body('avatar')
        .custom((value, {req}) => {
            let file = req.file
                if(file){
                    const extensionesValidas = [".png", ".jpg", ".jpeg"];
                    let filePath = (path.extname(file.originalname))
                    if(!extensionesValidas.includes(filePath)){
                        throw new Error(`Los formatos de imagen válidos son ${extensionesValidas.join(', ')}`);
                    }
                }

            return true

        })

]

module.exports = userCreateValidation
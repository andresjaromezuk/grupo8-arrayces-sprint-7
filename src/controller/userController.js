const {User, Role} = require('../database/models')


const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const userController = {

    login: function (req, res){
        res.render("users/login")
    },
    
    register: function (req, res){
        res.render("users/register")
    },

    processRegister: async (req, res)=> {
        let file = req.file
        console.log(file)
        
        const errors = validationResult(req)

        console.log(errors)
        
        if(!errors.isEmpty()){
            if(file){
                let filePath = path.join(__dirname, '../../public/images/users/' + file.filename)
                fs.unlinkSync(filePath)
            }

            return res.render('users/register', {
                errors : errors.mapped(),
                oldData : req.body,
            })

        }
        
            try {
                let userToFind = await User.findOne({
                    where: {
                        email: req.body.email
                    }
                }) 
    
                if(userToFind){
                    return res.render('users/register', {
                        errors:{
                            email:{
                                msg: 'Este mail ya corresponde a un usuario registrado'
                            }
                        },
                        oldData : req.body} )
                }
            } catch (error) {
                res.json(error)
            }

            let {firstName, lastName, userName, email, password, confirmPassword} = req.body

            let newUser = {
                firstName,
                lastName,
                userName,
                email,
                password: bcrypt.hashSync(password, 10),
                confirmPassword: bcrypt.hashSync(confirmPassword, 10),
                avatar: file ? file.filename : "avatar-default-image.jpg",
                token: bcrypt.hashSync(String(Date.now()), 10)
            }

            try {
                await User.create(newUser)
            } catch (error) {
                res.json(error)
            }

            res.redirect('/users/login')
        
    },

    processLogin: async function(req, res) {

        /* console.log(req.body.password) */

        const include = ['Role']
    
        try {
            let userToLogin = await User.findOne({
                where: {
                    email: req.body.email
                },
                include
            }) 

            

            if (!userToLogin) {
                return res.render('users/login', {
                    errors:{
                        email:{
                            msg: 'No se encuentra el usuario'
                        }
                    }
                })
            }

           

            if(!bcrypt.compareSync(req.body.password, userToLogin.password)){
                return res.render('users/login', {
                    errors:{
                        password:{
                            msg: 'Alguno de los datos ingresados es incorrecto'
                        }
                    }
                })
            } 

            delete userToLogin.password
            delete userToLogin.confirmPassword
            req.session.userLogged = userToLogin

            console.log('Este es elusuario que se guardó en session:')
            console.log(req.session.userLogged)
            
            if(req.body.rememberMe){
                res.cookie("token", userToLogin.token,  {maxAge: 1000*60*60*24})
            }
    
            res.redirect('/users/profile')
    
            
        } catch (error) {
            res.json(error)
        }
        
        
    },

    edit:  (req, res) => {
        return res.render('users/userEdit',)
    },

    update: async (req, res) => {

        let file = req.file
        console.log(file)
        
        const errors = validationResult(req)

        console.log(errors)
        
        if(!errors.isEmpty()){
            if(file){
                let filePath = path.join(__dirname, '../../public/images/users/' + file.filename)
                fs.unlinkSync(filePath)
            }

            return res.render('users/userEdit', {
                errors : errors.mapped(),
                oldData : req.body,
            })

        }

        let {firstName, lastName, userName, email} = req.body

        let userInSession = req.session.userLogged

        console.log('este es el usuario en sesión:')
        console.log(userInSession)

        let userRegistered

        try {
            userRegistered = await User.findOne({
                where:{
                    email: userInSession.email
                }
            })
        } catch (error) {
            res.json(error)
        }

        let userToUpdate = {
            firstName,
            lastName,
            userName,
            email,
            password: userRegistered.password,
            confirmPassword: userRegistered.confirmPassword,
            avatar: file ? file.filename : userRegistered.avatar,
            token: userRegistered.token
        }

        try {
            await User.update(userToUpdate, {
                where: {
                    email: userRegistered.email
                }
            })

            let userUpdated = await User.findOne({
                where:{
                    email: userInSession.email
                }
            })

            delete userUpdated.password
            delete userUpdated.confirmPassword
            req.session.userLogged = userUpdated

            return res.redirect('/users/profile')
        } catch (error) {
            res.json(error)
        }

    },

    profile: function (req, res) {
        return res.render('users/profile')
    },

    logout: function (req, res)  {
		res.clearCookie('token');
		req.session.destroy();
		return res.redirect('/');
	},

    cart: function (req, res){
        res.render("users/cart")
    }


}

module.exports = userController

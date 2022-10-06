const {User} = require('../database/models')

async function userLoggedMiddleware (req, res, next) {
        
            res.locals.isLogged = false

            const userFromCookie = await User.findOne({
                where: {
                    token: req.cookies.token || " "
                }
            })
        
        if(userFromCookie){
        
            delete userFromCookie.password
            delete userFromCookie.confirmPassword
            req.session.userLogged = userFromCookie

        }

        if(req.session.userLogged){
            res.locals.isLogged = true
            res.locals.userLogged = req.session.userLogged
        }
    
        next()
            
 
}

module.exports = userLoggedMiddleware
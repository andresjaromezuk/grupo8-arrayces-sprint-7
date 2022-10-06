const adminMiddleware = (req, res, next) => {
    
    if(req.session.userLogged.RoleId != 1){
        return res.redirect("/");
    }
    
    next()
} 

module.exports = adminMiddleware;
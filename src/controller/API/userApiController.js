const {User, Role} = require('../../database/models')

const userApiController = { 

	list: async  (req, res) => {

        const include = ['Role']
        let meta={status:'success', length:0 }

        try {
            let users = await User.findAll({include})
            meta.length = users.length
            
            let data = []
            
            users.forEach(user =>{
                delete user.dataValues.password
                delete user.dataValues.confirmPassword
                delete user.dataValues.token
                 data.push({
                    user,
                    url: `${process.env.HOST}/api/users/${user.id}`
                })
            })

            res.status(200).json({meta, data}) 
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
		 
    },
    detail: async  (req, res) => {

        let id = req.params.id

        try {
            let user = await User.findByPk(id)
            console.log(user.dataValues)

            delete user.dataValues.password
            delete user.dataValues.confirmPassword
            delete user.dataValues.token

            data = {
                user,
                avatarUrl:`${process.env.HOST}/images/users/${user.avatar}`
            }
            res.status(200).json({data}) 
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
		 
    }
}

module.exports = userApiController
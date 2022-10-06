const {Product} = require("../database/models")

/* const path = require('path'); */
/* const fs = require('fs'); */


const mainController = {

    index: async  (req, res) => {
        //compartimos los datos de los productos a la vista

        const  include = ['Type', 'Size', 'Category', 'Images', 'Fee']

        try {
            let products = await Product.findAll({include})
            return res.render("products/index", {products})
        } catch (error) {
            res.json(error)
        }

         
    }

}

module.exports = mainController
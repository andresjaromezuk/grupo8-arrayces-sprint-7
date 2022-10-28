
const {Product, Image, Type, Size, Category, Fee} = require('../../database/models')
/* const { Op } = require("sequelize"); */
const db = require('../../database/models') 
const Op = db.Sequelize.Op

const productApiController = { 

	list: async  (req, res) => {

        const  include = ['Type', 'Size', 'Category', 'Images', 'Fee']

        let meta={status:'success', length:0}

        try {
            let products = await Product.findAll({include})
            let plantas = await Product.findAll({where: {typeId: 1}, include})
            let macetas = await Product.findAll({where: {typeId: 2}, include})
            let cuidados = await Product.findAll({where: {typeId: 3}, include})
            let categories = await Type.findAll()

            meta.length = products.length
            meta.plantasLength = plantas.length
            meta.macetasLength = macetas.length
            meta.cuidadosLength = cuidados.length
            meta.categoriesLength = categories.length
        
            let data = []
            
            products.forEach(product =>{
                 data.push({
                    product,
                    url: `${process.env.HOST}/products/detail/${product.id}`
                })
            })
            
            
            res.status(200).json({meta, data}) 
        } catch (error) {
            res.status(500).json({ error: error.message })
        } 
    }, 
    
    detail: async  (req, res) => {

        const  include = ['Type', 'Size', 'Category', 'Images', 'Fee']

        let id = req.params.id

        try {
            let product = await Product.findByPk(id, {include})

            /* let imgs = product.Images.forEach(image =>{
                `http://localhost:3000/images/${image.name}`
            })
            console.log(imgs) */
            data = {
                product,
                imgUrl : [`${process.env.HOST}/images/${product.Images[0].name}`, `http://localhost:3000/images/${product.Images[1].name}`],
                url: `${process.env.HOST}/products/detail/${product.id}`
            }
            res.status(200).json({data}) 
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
		 
    },

    lastProduct: async (req, res) => {

        /* const  include = [{'Type'}, 'Size', 'Category', 'Images', 'Fee'] */
        const include = [{model:Image, attributes:['name']}]

        try {
            let products = await Product.findAll({
                include,
                attributes:['id', 'name', 'price', 'description' ],
                order: [[ 'id', 'DESC' ]],
                limit: 1
            })

            let product = products[0]

            console.log(product)
            /* let imgs = product.Images.forEach(image =>{
                `http://localhost:3000/images/${image.name}`
            })
            console.log(imgs) */
            data = {
                product,
                imgUrl : [`${process.env.HOST}/images/${product.Images[0].name}`, `http://localhost:3000/images/${product.Images[1].name}`],
                url: `${process.env.HOST}/products/detail/${product.id}`
            }
            res.status(200).json({data}) 
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    search: async (req, res) => {
        
        try {  
            const  include = ['Type', 'Size', 'Category', 'Images', 'Fee']

            let meta={status:'success', length:0}

            let products = await Product.findAndCountAll({
                include,
                where: {
                    name: {[Op.like] : '%' + req.query.keyword + '%'}
                },
            })

            console.log(products)

            meta.length = products.count
            
            let data = []

            products.rows.forEach(product =>{
                 data.push({
                    product,
                    url: `${process.env.HOST}/api/products/${product.id}`
                })
            })

            res.status(200).json({meta, data})

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }, 

    filter: async (req, res) =>{
        const keyword1 = req.query.keyword1
        const keyword2 = req.query.keyword2

        const  include = ['Type', 'Size', 'Category', 'Images', 'Fee']

        console.log('Al controller llegaron estas querys:')
        console.log(req.query)


        let meta={status:'success', length:0}
        let data = []

        if(keyword1 != "" && keyword2 == "" ){
            try {
                let products = await Product.findAll({
                    where:{
                        typeId: keyword1         
                    },
                    include
                })

                meta.length = products.length
    
                products.forEach(product =>{
                     data.push({
                        product,
                        url: `${process.env.HOST}/api/products/${product.id}`
                    })
                })
    
                res.status(200).json({meta, data})
    
                
            } catch (error) {
                res.json(error)
            }
            
        }else if (keyword1 == "" && keyword2 != "" ){
            try {
                let products
            switch(keyword2){
                case "lowest":
                    products = await Product.findAll({
                        order: [["price", "ASC"]],
                        include
                    })

                meta.length = products.length
            
                products.forEach(product =>{
                     data.push({
                        product,
                        url: `${process.env.HOST}/api/products/${product.id}`
                    })
                })
    
                res.status(200).json({meta, data})
                break
                case "highest":
                    products = await Product.findAll({
                        order: [["price", "DESC"]],
                        include
                    })
                meta.length = products.length
            
    
                products.forEach(product =>{
                     data.push({
                        product,
                        url: `${process.env.HOST}/api/products/${product.id}`
                    })
                })
    
                res.status(200).json({meta, data})

                break
                case "2":
                     products = await Product.findAll({
                        where:{
                            categoryId: keyword2         
                        },
                        include
                    })

                meta.length = products.length
            
                products.forEach(product =>{
                     data.push({
                        product,
                        url: `${process.env.HOST}/api/products/${product.id}`
                    })
                })
    
                res.status(200).json({meta, data})
                break
                case "3":
                    products = await Product.findAll({
                        where:{
                            categoryId: keyword2         
                        },
                        include
                    })
                
                meta.length = products.length
            
                products.forEach(product =>{
                     data.push({
                        product,
                        url: `${process.env.HOST}/api/products/${product.id}`
                    })
                })
    
                res.status(200).json({meta, data})
            }
            } catch (error) {
                res.json(error)
            }

        }else if (keyword1 != "" && keyword2 != "" ){
            let products
            switch(keyword2){
                case "lowest":
                    products = await Product.findAll({
                        where:{
                            typeId: keyword1
                        },
                        order: [["price", "ASC"]],
                        include
                    })
                
                meta.length = products.length
            
                products.forEach(product =>{
                     data.push({
                        product,
                        url: `${process.env.HOST}/api/products/${product.id}`
                    })
                })
    
                res.status(200).json({meta, data})
                break
                case "highest":
                    products = await Product.findAll({
                        where:{
                            typeId: keyword1
                        },
                        order: [["price", "DESC"]],
                        include
                    })
                    
                meta.length = products.length
            
                products.forEach(product =>{
                     data.push({
                        product,
                        url: `${process.env.HOST}/api/products/${product.id}`
                    })
                })
    
                res.status(200).json({meta, data})
                break
                case "2":
                    products = await Product.findAll({
                        where:{
                            typeId: keyword1,
                            categoryId: keyword2         
                        },
                        include
                    })
                
                meta.length = products.length
            
                products.forEach(product =>{
                     data.push({
                        product,
                        url: `${process.env.HOST}/api/products/${product.id}`
                    })
                })
    
                res.status(200).json({meta, data})
                    break
                case "3":
                    products = await Product.findAll({
                        where:{
                            typeId: keyword1,
                            categoryId: keyword2         
                        },
                        include
                    })
                meta.length = products.length
            
                products.forEach(product =>{
                     data.push({
                        product,
                        url: `${process.env.HOST}/api/products/${product.id}`
                    })
                })
    
                res.status(200).json({meta, data})
                    break
            }
            
        } else{
            try {
                let products = await Product.findAll({include})
                meta.length = products.length
            
                products.forEach(product =>{
                     data.push({
                        product,
                        url: `${process.env.HOST}/api/products/${product.id}`
                    })
                })
    
                res.status(200).json({meta, data})
            } catch (error) {
               res.json(error) 
            }

        }
    }
}

module.exports = productApiController
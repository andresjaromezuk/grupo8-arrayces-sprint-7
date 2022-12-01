
const {Product, Image, Type, Size, Category, Fee} = require('../../database/models')
/* const { Op } = require("sequelize"); */
const db = require('../../database/models') 
const Op = db.Sequelize.Op

const getPagination = (page, size) => {
    const limit = size ? size : 4
    const offset = page ? page * limit : 0

    return { limit, offset }
}

const getDataPagination = (productsRow, types, sizes, categories, fees, page, limit) =>{
    /* let {count: total, rows: products} = productsRow */
    let total = productsRow.count 
    let rows = productsRow.rows
    let currentPage = page ? Number(page) : 0
    const totalPages = Math.ceil(total / limit) 

    let products = []

    //Creamos el array de productos y le agregamos la url del detalle y url de 
    //la imagen

    rows.forEach(product =>{
        products.push({
           id: product.id,
           name: product.name,
           description: product.description,
           price: product.price,
           type: {id: product.Type.id, name: product.Type.name},
           category: {id: product.Category.id, name: product.Category.name},
           fees:{id: product.Fee.id, number: product.Fee.number},
           size:{id: product.Size.id, name: product.Size.name},
           url: `${process.env.HOST}/products/detail/${product.id}`,
           urlImg: `${process.env.HOST}/images/${product.Images[0].name}`
       })
   })

    return {products, types, sizes, categories, fees, total, currentPage, totalPages}
}

const productApiController = { 

    listWithPage: async (req, res) =>{

        const {page, size} = req.query

        const {limit, offset} = getPagination(page, size)

        const  include = [
                            {model: Type, attributes:['id','name']}, 
                            {model: Size, attributes:['id','name']}, 
                            {model: Category, attributes:['id','name']}, 
                            {model: Image, attributes:['name']}, 
                            {model: Fee, attributes:['id','number']}, 
                        ]

        let meta={status:'success', length:0}

        try {
            let productsRow = await Product.findAndCountAll(
                {
                include,
                attributes:['id', 'name', 'price', 'description'],
                limit,
                offset
                })
            
                
                let plantas = await Product.findAll({where: {typeId: 1}, include})
                let macetas = await Product.findAll({where: {typeId: 2}, include})
                let cuidados = await Product.findAll({where: {typeId: 3}, include})
                let categories = await Category.findAll()
                let types = await Type.findAll()
                let sizes = await Size.findAll()
                let fees = await Fee.findAll()
                
            meta.length = productsRow.count
            meta.plantasLength = plantas.length
            meta.macetasLength = macetas.length
            meta.cuidadosLength = cuidados.length
            meta.categoriesLength = types.length

            let data = getDataPagination(productsRow, types, sizes, categories, fees, page, limit)
            

            //Contenido de data {products, total, currentPage, totalPages}
            
            
            res.status(200).json({meta, data}) 
        } catch (error) {
            res.status(500).json({ error: error.message })
        } 

    },

    storeImage: async (req,res) =>{

        let files = req.files
        
        try {
            
            let imagesProducts = [];

            files.forEach(image => {
                imagesProducts.push({name: image.filename, productId: newProduct.id})
            })

            let images = await Image.bulkCreate(imagesProducts)

            return res.json({status:200, message: 'Imagen guardada existosamente'})
        } catch (error) {
             res.json(error.msg)
        }

    },

	list: async  (req, res) => {

        const  include = ['Type', 'Size', 'Category', /* 'Images', */ 'Fee']

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
                    url: `${process.env.HOST}/products/detail/${product.id}`,
                    /* urlImg: `${process.env.HOST}/images/${product.Images[0].name}` */
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

            let meta = {status:'success', length:0}

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
                    imgUrl : [`${process.env.HOST}/images/${product.Images[0].name}`, `http://localhost:3000/images/${product.Images[1].name}`],
                    url: `${process.env.HOST}/products/detail/${product.id}`
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
                        url: `${process.env.HOST}/products/detail/${product.id}`
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
                        url: `${process.env.HOST}/products/detail/${product.id}`
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
                        url: `${process.env.HOST}/products/detail/${product.id}`
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
                        url: `${process.env.HOST}/products/detail/${product.id}`
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
                        url: `${process.env.HOST}/products/detail/${product.id}`
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
                        url: `${process.env.HOST}/products/detail/${product.id}`
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
                        url: `${process.env.HOST}/products/detail/${product.id}`
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
                        url: `${process.env.HOST}/products/detail/${product.id}`
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
                        url: `${process.env.HOST}/products/detail/${product.id}`
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
                        url: `${process.env.HOST}/products/detail/${product.id}`
                    })
                })
    
                res.status(200).json({meta, data})
            } catch (error) {
               res.json(error) 
            }

        }
    },

    store: async (req, res) => {
        
        let files = req.files

        let {name, description, type, size, price, fees, category} = req.body


        let objAux={
            name: name,
            description: description,
            typeId: type,
            sizeId: size,
            price: price,
            feeId: fees,
            categoryId: category,
            stock: null,
            stockMin: null,
            stockMax: null,
        }

        console.log(objAux)

        try {
            let newProduct = await Product.create(objAux)

            let imagesProducts = [];

            files.forEach(image => {
                imagesProducts.push({name: image.filename, productId: newProduct.id})
            })

            let images = await Image.bulkCreate(imagesProducts)

             return res.json({status:200, message: 'Producto guardado existosamente'})
        } catch (error) {
             res.json(error.msg)
        }
	},
    
    destroy: async (req, res) => {
		let id = Number(req.params.id);

        try {

            /* let imagesSearched = await Image.findAll({
                where: {
                    productId: id
                }
            })

            console.log('llegaron estas imágenes:')
            console.log(imagesSearched)

            let imagesToDestroy = await Image.destroy({
                where: {
                    productId: id
                }
            })

            console.log(imagesToDestroy) */

            let productToDestroy = await Product.destroy({
                where: {
                    id: id
                }
            })
            /* console.log(productToDestroy)
            if(imagesSearched.length > 0) {
                console.log(imagesSearched)
                imagesSearched.forEach( image => {
                    const filePath = path.join(__dirname, `../../public/images/${image.name}`);
                    fs.unlinkSync(filePath)
                })
            
            } */

            let meta = {
                status: 200,
                message: 'Producto eliminado con éxito'
            }
            
            let data={
                productDeleted: productToDestroy
            }

            return res.json({meta, data})
        } catch (error) {
            res.json(error)
        }
    }
}

module.exports = productApiController
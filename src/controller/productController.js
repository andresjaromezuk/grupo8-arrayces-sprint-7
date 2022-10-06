const {Product, Image, Type, Size, Category, Fee} = require('../database/models')
const { Op } = require("sequelize");

const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

const productController = { 

	index: async  (req, res) => {
        //compartimos los datos de los productos a la vista

        const  include = ['Type', 'Size', 'Category', 'Images', 'Fee']

        try {
            let products = await Product.findAll({include})
            let type = await Type.findAll()
            return res.render("products/allProducts", {products, type})
        } catch (error) {
            res.json(error)
        }
		 
    },

    detail: async  (req, res) => {
        let id = Number(req.params.id)

        const  include = ['Type', 'Size', 'Category', 'Images', 'Fee']

        try {
            let product = await Product.findByPk(id, {include})
            let products = await Product.findAll({include})
            
            return res.render("products/detail", {product, products})
            
        } catch (error) {
            res.json(error)
        }
      
    }, 

	create: async (req, res) => {
        try {
            let types = await Type.findAll()
            let sizes = await Size.findAll()
            let categories = await Category.findAll()
            let fees = await Fee.findAll()
            return res.render("products/create", {types, sizes, categories,fees })
        } catch (error) {
            res.json(error)
        }
        
    },

	store: async (req, res) => {
        
        let files = req.files
        
        const errors = validationResult(req)

        console.log(errors)

		if(!errors.isEmpty()){
            files.forEach((file) => {
                let filePath = path.join(__dirname, '../../public/images/' + file.filename)
                fs.unlinkSync(filePath)
            })

            try {
                let types = await Type.findAll()
                let sizes = await Size.findAll()
                let categories = await Category.findAll()
                let fees = await Fee.findAll()
                return res.render('products/create', {
                    errors : errors.mapped(),
                    oldData : req.body,
                    types,
                    sizes,
                    categories,
                    fees
                })
            } catch (error) {
                res.json(error)
            }

		} 

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

             return res.redirect('/')
        } catch (error) {
             res.json(error.msg)
        }
	},

    search: async (req, res) => {
        try {  
            const  include = ['Type', 'Size', 'Category', 'Images', 'Fee']

            
            let products = await Product.findAll({
                where: {
                    name: {[Op.like] : '%' + req.query.keyword + '%'}
                },
                include
            })
            res.render('./products/searchResult', {products})
        } catch (error) {
            res.json(error)
        }
    },

    filter: async (req, res) =>{
        const keyword1 = req.query.keyword1
        const keyword2 = req.query.keyword2

        const  include = ['Type', 'Size', 'Category', 'Images', 'Fee']

        console.log('Al controller llegaron estas querys:')
        console.log(req.query)

        if(keyword1 != "" && keyword2 == "" ){
            try {
                let type = await Type.findAll()
                let products = await Product.findAll({
                    where:{
                        typeId: keyword1         
                    },
                    include
                })
    
                res.render('./products/filterResult', {products, type, keyword1, keyword2})
            } catch (error) {
                res.json(error)
            }
            
        }else if (keyword1 == "" && keyword2 != "" ){
            try {
                let type = await Type.findAll()
                let products
            switch(keyword2){
                case "lowest":
                    products = await Product.findAll({
                        order: [["price", "ASC"]],
                        include
                    })
                    res.render('./products/filterResult', {products, type, keyword1, keyword2})
                    break
                case "highest":
                    products = await Product.findAll({
                        order: [["price", "DESC"]],
                        include
                    })
                    res.render('./products/filterResult', {products, type,keyword1, keyword2})
                    break
                case "2":
                     products = await Product.findAll({
                        where:{
                            categoryId: keyword2         
                        },
                        include
                    })
                    res.render('./products/filterResult', {products, type, keyword1, keyword2})
                    break
                case "3":
                    products = await Product.findAll({
                        where:{
                            categoryId: keyword2         
                        },
                        include
                    })
                    res.render('./products/filterResult', {products, type, keyword1, keyword2})
            }
            } catch (error) {
                res.json(error)
            }

        }else if (keyword1 != "" && keyword2 != "" ){
            let type = await Type.findAll()
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
                    res.render('./products/filterResult', {products, type, keyword1, keyword2})
                    break
                case "highest":
                    products = await Product.findAll({
                        where:{
                            typeId: keyword1
                        },
                        order: [["price", "DESC"]],
                        include
                    })
                    res.render('./products/filterResult', {products, type, keyword1, keyword2})
                    break
                case "2":
                    products = await Product.findAll({
                        where:{
                            typeId: keyword1,
                            categoryId: keyword2         
                        },
                        include
                    })
                    res.render('./products/filterResult', {products, type, keyword1, keyword2})
                    break
                case "3":
                    products = await Product.findAll({
                        where:{
                            typeId: keyword1,
                            categoryId: keyword2         
                        },
                        include
                    })
                    res.render('./products/filterResult', {products, type, keyword1, keyword2})
                    break
            }
            
        } else{
            try {
                let products = await Product.findAll({include})
                let type = await Type.findAll()
                return res.render("products/allProducts", {products, type})
            } catch (error) {
               res.json(error) 
            }

        }
    },

    edit: async (req, res) => {
        const  include = ['Type', 'Size', 'Category', 'Images', 'Fee']

        try {
            let id = Number(req.params.id)
            let product = await Product.findByPk(id, {include})

            let types = await Type.findAll()
            let sizes = await Size.findAll()
            let categories = await Category.findAll()
            let fees = await Fee.findAll()
        res.render("products/edit", {product, sizes, categories, fees, types})
        } catch (error) {
            res.json(error)
        }
    },

	update: async (req, res) => {
		let id = Number(req.params.id);
        let product
		try {
             product = await Product.findByPk(id)
        } catch (error) {
            res.json(error)
        }
		let files = req.files

		const errors = validationResult(req)

        console.log(errors)

		if(!errors.isEmpty()){
            files.forEach((file) => {
                let filePath = path.join(__dirname, '../../public/images/' + file.filename)
                fs.unlinkSync(filePath)
            })

            try {
                let types = await Type.findAll()
                let sizes = await Size.findAll()
                let categories = await Category.findAll()
                let fees = await Fee.findAll()
                return res.render('products/edit', {
                    product: product,
                    errors : errors.mapped(),
                    oldData : req.body,
                    types,
                    sizes,
                    categories,
                    fees
                })
            } catch (error) {
                res.json(error)
            }
           
		} 

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
            let productToEdit = await Product.update(objAux, {
                where: {
                    id: id
                }})


            let imagesProducts = [];

            files.forEach(image => {
                imagesProducts.push({name: image.filename, productId: productToEdit.id})
            })

            if(imagesProducts.length > 2){
            let images = await Image.bulkCreate(imagesProducts)
            } else {
                return res.redirect('/')
            }
        } catch (error) {
             res.json(error.msg)
        }
	},

    destroy: async (req, res) => {
		let id = Number(req.params.id);

        try {

            let imagesSearched = await Image.findAll({
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

            console.log(imagesToDestroy)

            let productToDestroy = await Product.destroy({
                where: {
                    id: id
                }
            })
            console.log(productToDestroy)
            if(imagesSearched) {
                console.log(imagesSearched)
                imagesSearched.forEach( image => {
                    const filePath = path.join(__dirname, `../../public/images/${image.name}`);
                    fs.unlinkSync(filePath)
                })
            
            }
            return res.redirect("/")
        } catch (error) {
            res.json(error)
        }
    }
}

module.exports = productController
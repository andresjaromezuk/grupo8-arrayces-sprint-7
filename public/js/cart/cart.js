window.addEventListener('load', function(){

    //Traemos todos los productos existentes en la base de datos
    
    let products

    fetch('https://arrayces-sprint-7.herokuapp.com/api/products/')
    .then(res=> res.json())
    .then(info=> 
        products = info.data)


    //--------------------------------------------------------------------
    //Función para agregar productos al carrito

    function addProductToCart(product){

        //Creamos el producto para el carrito

        const productCart = {
            id: product.product.id,
            name: product.product.name,
            cantidad: 1,
            description: product.product.description,
            price: Number(product.product.price),
            image: product.urlImg
        }

        //Recuperamos los datos de localStorage para agregar otro
        //producto

        if(localStorage.getItem('cartProducts')){

            let cart = JSON.parse(localStorage.getItem('cartProducts'))
            
            console.log(cart)

            
            //Si ya existe el producto en el carrito, modifico
            //la cantidad

            if(cart.some(product => product.id == productCart.id)){

                cart.forEach(product=> {
                    if(product.id == productCart.id){
                        product.cantidad += 1
                    }
                })

                localStorage.setItem('cartProducts', JSON.stringify(cart))

            }else{

                //Si el producto no existe, pero el carrito tiene otros
                //productos, guardo el nuevo

                cart.push({...productCart})
                    
                console.log(cart)
                
                localStorage.setItem('cartProducts', JSON.stringify(cart))
                
            }
            
        }else{

            //Si localStorage está vacío, se parte de un carrito vacío
            //y se inserta el primer elemento
            
            let cart = []

            cart.push({...productCart})

           console.log(cart)

           localStorage.setItem('cartProducts', JSON.stringify(cart))

        }
    }

    //---------------------------------------------------------------------
    //Función para mostrar los productos agregados
    function showCartQuantity (){
        
        let cartQuantity = document.querySelector('.cartQuantity')
        let cart = JSON.parse(localStorage.getItem('cartProducts')) 
        let totalQuantity = 0
        
        cart.forEach(product => {
            totalQuantity += product.cantidad
        });
        
        cartQuantity.innerHTML=totalQuantity
    }

    //--------------------------------------------------------------------
    //Preparamos el evento para agregar productos
    
    //Capturamos el botón de cart y el inpit hidden con id

    const bags = document.querySelectorAll('#shopProduct')

    const cartInputs = document.querySelectorAll('#cartInput')

    
    for (let i = 0; i < bags.length; i++){

        //Recorremos todos los botones capturados y le aplicamos un
        //evento CLICk

        bags[i].addEventListener('click', function(e){
            e.preventDefault()

            console.log(products)

            //Capturamos el valor del id y buscamos el producto
                
            const id = cartInputs[i].value

            const product = products.find(item => item.product.id == id)

            console.log(product)

            //Ejecutamos las dos funciones previamente establecidas
            addProductToCart(product)
            showCartQuantity()
            
        })
        
    }

    //--------------------------------------------------------------------
    //Mostramos el total de productos en el carrito en el header

    if(localStorage.getItem('cartProducts')){
        showCartQuantity()
    }else{
        /* let cartQuantity = document.querySelector('.cartQuantity') */
        cartQuantity.innerHTML = 0
    }
   
    })


window.addEventListener('load', function(){

    const productName = document.querySelector('.productDetailTitle').textContent
    const productPrice = document.querySelector('.productDetailPrice').textContent
    const productId = document.querySelector('#cartInput').value
    const productImg = document.querySelector('.default').getAttribute('src')
    const cartButton = document.querySelector('#cartButtonDetail')
    
    

    //---------------------------------------------------------------------
    //Función para mostrar los productos agregados
    function showCartQuantity(){
        
        let cartQuantity = document.querySelector('.cartQuantity')
        let cart = JSON.parse(localStorage.getItem('cartProducts')) 
        let totalQuantity = 0
        
        cart.forEach(product => {
            totalQuantity += product.cantidad
        });
        
        cartQuantity.innerHTML=totalQuantity
    }

    //------------------------------------------------------------------------
    //Función para mostrar la cantidad en el Product Detail

    function showQuantityDetail(){

        let quantity = document.querySelector('#quantityProductDetailHidden')
        let show = document.querySelector('#quantityProductDetail')
    
        let id = Number(quantity.textContent)

        if(localStorage.getItem('cartProducts')){
            
            let cart = JSON.parse(localStorage.getItem('cartProducts')) 
            let productInCart = cart.find(product => product.id == id)
            let productQuantity = productInCart.cantidad
    
            show.innerHTML= `<span class="quantityProductDetail"> ${productQuantity} </span>`
        }else{
            show.innerHTML= `<span class="quantityProductDetail"> 0 </span>`
        }
    
    }

    //---------------------------------------------------------------------
    //Función para agregar los productos al carrito
    
    function addProductToCart(){

    const productCart = {
        id: Number(productId),
        name: productName,
        cantidad: 1,
        price: Number(productPrice.replace("$", "").trim()),
        image: productImg
    }

    if(localStorage.getItem('cartProducts')){

        let cart = JSON.parse(localStorage.getItem('cartProducts'))
        
        
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

    showQuantityDetail()

    
    cartButton.addEventListener('click', (e)=> {
        e.preventDefault()
        addProductToCart()
        showCartQuantity()
        showQuantityDetail()
    })
})
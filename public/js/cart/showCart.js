window.addEventListener('load', function(){

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

    //-----------------------------------------------------------------
    //Función para mostrar el formulario del carrito
    
    function showCartForm(){

        let showCartForm = document.querySelector('#showCartForm')
    
        //Formulario del carrito
    
        let cartForm = 
        `<section class="cartForm">
            <form action="#" method="GET">
                <p class="titleCart"> Entrega / <strong> Pago </strong> </p>
                <div class="contact">
                    <label for="email"> DATOS DE CONTACTO </label>
                    <input type="email" name="email" id="email" placeholder="Email">
                </div>
                <div class="suscription" for="suscripcion">
                    <input type="checkbox" name="suscripcion" id="suscripcion"> Quiero recibir ofertas y novedades por email.
                </div>
                <div class="delivery">
                    <label> ENTREGA </label>
                    <select name="barrios">
                        <option> Elige tu barrio </option>
                        <option value="almagro"> Almagro </option>
                        <option value="barracas"> Barracas </option>
                        <option value="caballito"> Caballito </option>
                        <option value="flores"> Flores </option>
                        <option value="palermo"> Palermo </option>
                    </select>
                    <input type="text" name="cp" placeholder="Código postal">
                </div>
                <p> Solo realizamos envíos dentro de CABA. </p>
                <div class="cartButton">
                    <button type="submit"> CONTINUAR </button>
                </div>
                <div class="viewMoreCart">
                    <a href="/">  
                        <p class="moreCart"><span class="material-symbols-outlined" id="arrow"> arrow_back </span> Seguir comprando </p> 
                    </a>
                </div>
            </form>
        </section>`

        //Mostramos el form
        showCartForm.innerHTML = cartForm
    }

    //-----------------------------------------------------------------
    //Función para mostrar los productos del carrito

    function showCartProducts(cart){

        let showProductCart = document.querySelector('#showProductCart')
        
        //Array de productos del carrito recorrido por un forEach

        let productCart = ""
        
        cart.forEach(product => {
            productCart += 
            `<section class="cartProducts">
                <article class="cartArticle">
                    <div class="cartArticleImg">
                        <figure>
                            <img src=${product.image} alt="producto">
                        </figure>
                    </div>
                    <div class="articleInfo"> 
                        <div class="titleAndPrice">
                            <h3> ${product.name} </h3>
                            <p> $ ${product.price} </p>
                        </div>
                        <div class="descriptionAndTrash">
                            <form class="articleDescription">
                                <label>Tamaño</label>
                                <select name="tamaño">
                                    <option value="small"> S (Small) </option>
                                    <option value="medium"> M (Medium) </option>
                                    <option value="large"> L (Large) </option>
                                    <option value="extra-large"> XL (Extra Large) </option>
                                </select>
                                <div class="articleAmount">
                                    <span> <input type="number" class="articleAmountInput" name="${product.id}" value="${product.cantidad}" > </span>
                                </div>   
                            </form>       
                            <div class="trash">
                                <i class="far fa-trash-alt" id="removeProduct" title="${product.id}"></i>
                            </div>
                        </div>
                    </div>
                </article>
                <div class="line"></div>`
        })

        //Inyectamos los productos
        showProductCart.innerHTML = productCart
    }
        
    //-----------------------------------------------------------------
    //Función para mostrar el total del carrito

    function showTotal(cart){

        let showProductTotal= document.querySelector('#showProductTotal')

        let total = 0

        cart.forEach(product => {
            total += product.cantidad*product.price
        })

        //Guardamos el total en una variable y la insertamos en el html

        let cartTotal = 
            `<div class="clearCartButton">
                <button id="clearCartButton" > VACIAR CARRITO </button>
            </div>
            <div>
                <div class="subtotal">
                    <p> Subtotal </p>
                    <p>$ ${total}</p>
                </div>
                <div class="line"></div>
                <div class="total">
                    <p> Total </p>
                    <p>$ ${total}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="discount">
                <p> ¿Tenés un cupón de descuento? </p>
            </div>`

        //Mostramos el total
        showProductTotal.innerHTML = cartTotal
    }

    //-----------------------------------------------------------------
    //Función para vaciar el carrito
        
    let emptyCart = () => {
        
        //Limpiamos el localStorage
        localStorage.clear()
        
        //Capturamos los botones donde vamos a mostrar vacío
        let emptyCart = document.querySelector('#emptyCart')
        let showCartForm = document.querySelector('#showCartForm')
        let showProductCart = document.querySelector('#showProductCart')
        let showProductTotal= document.querySelector('#showProductTotal')
    

        //Mostramos vacías las secciones del carrrito 
        showCartForm.innerHTML = ""
        showProductCart.innerHTML = ""
        showProductTotal.innerHTML = ""
        cartQuantity.innerHTML = 0

        //Lo reemplazamos por  un html de carrito vacío
        emptyCart.innerHTML=
        `<h1 class="emptyCart"> Tu carrito está vacío </h1>
        <div class="cartIconWrapper">
            <span class="material-symbols-outlined" id="cartIcon">
                 shopping_cart 
            </span>
        </div>`

    }

    //-----------------------------------------------------------------
     
    //Preguntamos si existe algo en el carrito
        if(localStorage.getItem('cartProducts')){
            
            //Traemos los productos del carrito y los convertimos del JSON
            let cart = JSON.parse(localStorage.getItem('cartProducts')) 

            //Ejecutamos las funciones para mostrar elementos del carrito
            showCartForm()
            showCartProducts(cart)
            showTotal(cart)

            //Configuramos la funcionalidad de los BOTONES del carrito

            // 1. VACIAR CARRRITO

            let cartButton = document.querySelector('#clearCartButton')

            cartButton.addEventListener('click', emptyCart)

            // 2. MODIFICAR CANTIDAD

            let hiddenInput = document.querySelectorAll('.articleAmountInput')
            
            hiddenInput.forEach(input => {
                input.addEventListener('change', (e) =>{
                    let id= input.getAttribute('name')
                    let cantidad = Number(input.value)

                    if(cantidad < 1){
                        cantidad = 1
                        location.reload()
                    }else{

                        cart.forEach(product=> {
                            if(product.id == id){
                                product.cantidad = cantidad
                            }
                        })
    
                    localStorage.setItem('cartProducts', JSON.stringify(cart))

                    showCartQuantity()
                    showTotal(cart)
                    
                    location.reload()
                    }
                    

                })

            })

            //3. ELIMINAR UN SOLO PRODUCTO

            let trash = document.querySelectorAll('#removeProduct')
            
            for (let i = 0; i < trash.length; i++){
                trash[i].addEventListener('click', () => {

                    if(cart.length > 1){
                        let id = Number(trash[i].getAttribute('title'))
                        let productDeleted = cart.filter(product=> product.id != id)
                        localStorage.setItem('cartProducts', JSON.stringify(productDeleted))
                        
                        location.reload()
                        
                    }else{
                        emptyCart()
                    }

                    
                })
            }
              
    }else{

        //Si no hay nada en el localStorage, mostramos un html de caarrito vacío
        let emptyCart = document.querySelector('#emptyCart')
        emptyCart.innerHTML = `
        <h1 class="emptyCart"> Tu carrito está vacío </h1>
        <div class="cartIconWrapper">
            <span class="material-symbols-outlined" id="cartIcon">
                 shopping_cart 
            </span>
        </div>`
    
    }


})
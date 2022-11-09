window.addEventListener('load', function(){
    
    let cartQuantity = document.querySelector('.cartQuantity')
    function showCartQuantity (){
        
        let cart = JSON.parse(localStorage.getItem('cartProducts')) 
        let totalQuantity = 0
        
        cart.forEach(product => {
            totalQuantity += product.cantidad
        });
        
        cartQuantity.innerHTML=totalQuantity
    }
    
    if(localStorage.getItem('cartProducts')){
        
        showCartQuantity()
        
    }else{
        cartQuantity.innerHTML = 0
    }
})
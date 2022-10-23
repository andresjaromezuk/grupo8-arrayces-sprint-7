window.onload = function(){

    const burgerMenu = document.querySelector('.burgerMenu')
    const burgerNavI = document.querySelector('.burgerNavI')

    
    
    burgerMenu.addEventListener('click', function(){
        
        burgerNavI.classList.toggle('active')

        if(burgerNavI.classList.contains('active')){
            burgerMenu.innerHTML= '<span class="material-symbols-outlined"> close </span>'
        }else{
            burgerMenu.innerHTML= '<span class="material-symbols-outlined">menu</span>'
        }

    })
        



}

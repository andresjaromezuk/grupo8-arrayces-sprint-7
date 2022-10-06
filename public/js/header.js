window.onload = function(){

    const burgerMenu = document.querySelector('.burgerMenu')
    const burgerNavI = document.querySelector('.burgerNavI')
    console.log(burgerMenu)
    console.log(burgerNavI)
    burgerMenu.addEventListener('click', function(){
        burgerNavI.classList.toggle('active')
       
    })

}

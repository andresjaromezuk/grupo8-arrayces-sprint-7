window.addEventListener('load', function(){

    /* Capturamos el form */

    const form = document.querySelector('.editForm')
   

    /* Capturamos el resto de los elementos del form */
    const name = document.getElementById('name')
    const description = document.getElementById('description')
    const image = document.getElementById('image')
    
    /* Expresiones regulares */
    const RegExpImage = /(.jpg|.jpeg|.png|.gif)$/i

    let errors = {}
    
    let nameValidation = () => {

        feedback = ""
    
        const nameError = document.querySelector('#nameError')
    
        if(name.value.trim() == ""){
            feedback = "Debes ingresar el nombre del producto"
        } 
    
        
        if(feedback){
            name.classList.remove('isValid')
            name.classList.add('isInvalid')
            errors.name = feedback
        } else { 
            name.classList.remove('isInvalid')
            name.classList.add('isValid')
            delete errors.name 
        }
    
        nameError.innerText = feedback
    }

    let descriptionValidation = () => {

        feedback = ""
    
        const descriptionError = document.querySelector('#descriptionError')
    
        if(description.value.trim() == ""){
            feedback = "Debes ingresar la descripción del producto"
        } 
    
        
        if(feedback){
            description.classList.remove('isValid')
            description.classList.add('isInvalid')
            errors.description = feedback
        } else { 
            description.classList.remove('isInvalid')
            description.classList.add('isValid')
            delete errors.description 
        }
    
        descriptionError.innerText = feedback
    }

    let imageValidation = () => {

        feedback = ""
    
        const imageError = document.querySelector('#imageError')
        
        let validation = image.value.match(RegExpImage)

        if(validation == null ? !null : validation.length < 2){
            feedback = "Los archivos requeridos son jpg, jpeg y png"
        } 
    
        
        if(feedback){
            image.classList.remove('isValid')
            image.classList.add('isInvalid')
            errors.image = feedback
        } else { 
            image.classList.remove('isInvalid')
            image.classList.add('isInvalid')
            delete errors.image 
        }
    
        imageError.innerText = feedback
    }

    form.addEventListener("submit", function(e){
        e.preventDefault()
    
        imageValidation()
        descriptionValidation()
        nameValidation()
    
        if(Object.keys(errors).length){
            e.preventDefault()
        }else{
            form.submit()
        }
    })

    name.addEventListener('input', nameValidation)
    description.addEventListener('input', descriptionValidation)
    image.addEventListener('input', imageValidation)
})
window.addEventListener('load', function(){

    /* Capturamos el form */
    const form = document.querySelector('.registerForm')
    
    
    /* Capturamos los elementos input */
    const avatar = document.querySelector('input#avatar')
    const firstName = document.querySelector('input#firstName')
    const lastName = document.querySelector('input#lastName')
    const userName = document.querySelector('input#userName')
    const email = document.querySelector('input#email')
    const password = document.querySelector('input#password')
    const confirmPassword = document.querySelector('input#confirmPassword')
    const buttonCrear = document.querySelector('button.crearCuenta')

    
    /* Expresiones regulares */
    const RegExpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i
    const RegExpPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/i
    const RegExpAvatar = /(.jpg|.jpeg|.png|.gif)$/i

    let errors = {}
    
    let avatarValidation = () => {
        
        feedback = ""
    
        const avatarError = document.querySelector('div#avatarError')
    
        if(!RegExpAvatar.exec(avatar.value)){
            feedback = "Los archivos requeridos son jpg, jpeg y png"
        } 
    
        
        if(feedback){
            avatar.classList.remove('isValid')
            avatar.classList.add('isInvalid')
            errors.avatar = feedback
        } else { 
            avatar.classList.remove('isInvalid')
            avatar.classList.add('isValid')
            delete errors.avatar 
        }
    
        avatarError.innerText = feedback
    }
    
    let firstNameValidation = () =>{
    
        let feedback = ""
    
        const firstNameError = document.querySelector('div#firstNameError')
    
        if(firstName.value.trim() == ""){
            feedback = "Debes ingresar tu nombre"
        } else if (firstName.value.length < 2){
            feedback = "Tu nombre debe tener al menos 2 caracteres"
        }
    
        
        if(feedback){
            firstName.classList.remove('isValid')
            firstName.classList.add('isInvalid')
            errors.firstName = feedback
        } else { 
            firstName.classList.remove('isInvalid')
            firstName.classList.add('isValid')
            delete errors.firstName 
        }
    
        firstNameError.innerText = feedback
        
    }
    
    let lastNameValidation = () =>{
    
        let feedback = ""
    
        const lastNameError = document.querySelector('div#lastNameError')
    
        if(lastName.value.trim() == ""){
            feedback = "Debes ingresar tu apellido"
        }else if (lastName.value.length < 2){
            feedback = "Tu apellido debe tener al menos 2 caracteres"
        }
        
        if(feedback){
            lastName.classList.remove('isValid')
            lastName.classList.add('isInvalid')
            errors.lastName = feedback
        } else { 
            lastName.classList.remove('isInvalid')
            lastName.classList.add('isValid')
            delete errors.lastName 
        }
    
        lastNameError.innerText = feedback
        
    }
    
    let userNameValidation = () =>{
    
        let feedback = ""
    
        const userNameError = document.querySelector('div#userNameError')
    
        if(userName.value.trim() == ""){
            feedback = "Debes ingresar un nombre de usuario"
        } else if (userName.value.length < 5){
            feedback = "El nombre de usuario debe tener al menos 5 caracteres"
        }
        
        if(feedback){
            userName.classList.remove('isValid')
            userName.classList.add('isInvalid')
            errors.userName = feedback
        } else { 
            userName.classList.remove('isInvalid')
            userName.classList.add('isValid')
            delete errors.userName 
        }
    
        userNameError.innerText = feedback
        
    }
    
    let emailValidation = () =>{
    
    
        let feedback = ""
    
        let emailError = document.querySelector('div#emailError')
    
        if(email.value.trim() == ""){
            feedback = "El campo de email no puede estar vacío"
        }else if (!RegExpEmail.test(email.value)){
            feedback = "Debes poner un formato de email válido"
        }
    
    
        if(feedback){
            email.classList.remove('isValid')
            email.classList.add('isInvalid')
            errors.email = feedback
        } else { 
            email.classList.remove('isInvalid')
            email.classList.add('isValid')
            delete errors.email
        }
    
        emailError.innerText = feedback
    }
    
    let passwordValidation = () =>{
    
        let feedback = ""
    
        let passwordError = document.querySelector('div#passwordError')
    
        if(password.value.trim() == ""){
            feedback = "Debes ingresar una contraseña"
        } else if (password.value.length < 8){
            feedback = "La contraseña debe tener al menos 8 caracteres"
        }else if(!RegExpPass.test(password.value)){
            feedback = "La contraseña debe tener una mayúscula, una minúscula, un número y caracter especial"
        }
    
        if(feedback){
            password.classList.remove('isValid')
            password.classList.add('isInvalid')
            errors.password = feedback
        } else { 
            password.classList.remove('isInvalid')
            passwordclassList.add('isValid')
            delete errors.password 
        }
    
        passwordError.innerText = feedback
    }
    
    let confirmPasswordValidation = () =>{
    
        let feedback = ""
    
        const confirmPasswordError = document.querySelector('div#confirmPasswordError')
    
        if(confirmPassword.value.trim() == ""){
            feedback = "Debes reingresar la contraseña"
        } else if (confirmPassword.value != password.value){
            feedback = "Las contraseñas no coinciden"
        }
    
        if(feedback){
            confirmPassword.classList.remove('isValid')
            confirmPassword.classList.add('isInvalid')
            errors.confirmPassword = feedback
        } else { 
            confirmPassword.classList.remove('isInvalid')
            classList.add('isValid')
            delete errors.confirmPassword 
        }
    
        confirmPasswordError.innerText = feedback
    }
    
    form.addEventListener("submit", function(e){
        e.preventDefault()
    
        firstNameValidation()
        lastNameValidation()
        userNameValidation()
        emailValidation()
        passwordValidation()
        confirmPasswordValidation()
    
        if(Object.keys(errors).length){
            e.preventDefault()
        }else{
            form.submit()
        }
    })
    
    firstName.addEventListener("input", firstNameValidation)
    lastName.addEventListener("input", lastNameValidation)
    userName.addEventListener("input", userNameValidation)
    email.addEventListener("input", emailValidation)
    password.addEventListener("input", passwordValidation)
    confirmPassword.addEventListener("input", confirmPasswordValidation)
    avatar.addEventListener("input", avatarValidation)
    })
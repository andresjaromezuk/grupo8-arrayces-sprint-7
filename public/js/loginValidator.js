window.addEventListener('load', function(){

    /* Requerimos el modelo User */ 


    /* Capturamos el form */
    const form = document.querySelector('.loginForm')
    
    
    /* Capturamos los elementos input */
    const loginEmail = document.querySelector('input.loginEmail')
    const loginPassword = document.querySelector('input.loginPassword')
    
    
    
    let errors = {}
    
    let emailValidation = async () =>{

        let feedback = ""
    
        let loginEmailError = document.querySelector('div#loginEmailError')
    
        if(loginEmail.value.trim() == ""){
            feedback = "El campo de email no puede estar vacío"
        } else if (!RegExpEmail.test(loginEmail.value)){
            feedback = "Debes poner un formato de email válido"
        }
    
    
        if(feedback){
            
            loginEmail.classList.remove('isValid')
            loginEmail.classList.add('isInvalid')
            
            errors.loginEmail = feedback
        } else { 
            loginEmail.classList.remove('isInvalid')
            loginEmail.classList.add('isValid')
            delete errors.loginEmail 
        }
    
        loginEmailError.innerText = feedback
    }
    
    let passwordValidation = () =>{
    
        let feedback = ""
    
        let loginPasswordError = document.querySelector('div#loginPasswordError')
    
        if(loginPassword.value.trim() == ""){
            feedback = "Debes ingresar una contraseña"
        }
    
        if(feedback){
            loginPassword.classList.remove('isValid')
            loginPassword.classList.add('isInvalid')
            errors.loginPassword = feedback
        } else { 
            loginPassword.classList.remove('isInvalid')
            loginPassword.classList.add('isValid')
            delete errors.loginPassword 
        }
    
        loginPasswordError.innerText = feedback
    }
    
    form.addEventListener("submit", function(e){
        e.preventDefault()
        emailValidation()
        passwordValidation()
    
        if(Object.keys(errors).length){
            e.preventDefault()
        }else{
            form.submit()
        }
    })
    
    loginEmail.addEventListener("input", emailValidation)
    loginPassword.addEventListener("input", passwordValidation)
    
    
    })
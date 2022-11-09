window.addEventListener('load', function(){

    const RegExpAvatar = /(.jpg|.jpeg|.png|.gif)$/i

    const avatar = document.querySelector('#avatar')
    const avatarPreview = document.querySelector('#avatarPreview')

    avatar.addEventListener('input', function(e) {

        const file = e.target.files[0]
        const img = URL.createObjectURL(file)

        console.log(img)

        if(RegExpAvatar.exec(avatar.value)){

            avatarPreview.src = img
        }

       /*  avatar.onload = function() {
            URL.revokeObjectURL(img)
        } */

    })
})
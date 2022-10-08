window.addEventListener('load', function(){

    const avatar = document.querySelector('#avatar')
    const avatarPreview = document.querySelector('#avatarPreview')

    avatar.addEventListener('input', function(e) {

        const file = e.target.files[0]
        const img = URL.createObjectURL(file)

        avatarPreview.src = img

       /*  avatar.onload = function() {
            URL.revokeObjectURL(img)
        } */

    })
})
window.addEventListener('load', function(){
    /* Elementos comunes */
    const slider = document.getElementById('bannerContainer')
    const buttonLeft = document.getElementById('sliderButtonLeft')
    const buttonRight = document.getElementById('sliderButtonRight')

    /* Elementos versión desktop */
    let figures = document.querySelectorAll('.desktopBanner')
    let lastFigure = figures[figures.length - 1]
    
    /* Elementos versión mobile */
    let mobileFigures = document.querySelectorAll('.mobileBanner')
    let lastMobileFigure = mobileFigures[figures.length - 1]

    /* Cambio orden de imagen para desktop */
    slider.insertAdjacentElement('afterbegin',lastFigure )
    
    /* Cambio orden de imagen para mobile */
    slider.insertAdjacentElement('afterbegin',lastMobileFigure )
    
    function moveToRight(){
        let firstFigure = document.querySelectorAll('.desktopBanner')[0]
        slider.style.marginLeft = '-200%'
        slider.style.transition = 'all 0.6s'
        setTimeout(function(){
            slider.style.transition = 'none'
            slider.insertAdjacentElement('beforeend',firstFigure)
            slider.style.marginLeft = '-100%'
        }, 600)
    }

    function moveToRightMobile(){
        let firstMobileFigure = document.querySelectorAll('.mobileBanner')[0]
        slider.style.marginLeft = '-200%'
        slider.style.transition = 'all 0.6s'
        setTimeout(function(){
            slider.style.transition = 'none'
            slider.insertAdjacentElement('beforeend', firstMobileFigure)
            slider.style.marginLeft = '-100%'
        }, 600)
    }

    function moveToLeft(){
        let figures = document.querySelectorAll('.desktopBanner')
        let lastFigure = figures[figures.length - 1]
        slider.style.marginLeft = '-200%'
        slider.style.transition = 'all 0.6s'
        setTimeout(function(){
            slider.style.transition = 'none'
            slider.insertAdjacentElement('afterbegin',lastFigure)
            slider.style.marginLeft = '-100%'
        }, 600)
    }

    function moveToLeftMobile(){
        let mobileFigures = document.querySelectorAll('.mobileBanner')
        let lastMobileFigure = figures[figures.length - 1]
        slider.style.marginLeft = '-200%'
        slider.style.transition = 'all 0.6s'
        setTimeout(function(){
            slider.style.transition = 'none'
            slider.insertAdjacentElement('afterbegin',lastMobileFigure)
            slider.style.marginLeft = '-100%'
        }, 600)
    }

    buttonRight.addEventListener('click', function(){
        moveToRight()
        moveToRightMobile()
    })
    
    buttonLeft.addEventListener('click', function(){
        moveToLeft()
        moveToLeftMobile()
    })

    this.setInterval(function(){
        moveToRight()
        moveToRightMobile()
    }, 4000)
})
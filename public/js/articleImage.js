window.addEventListener('load', function() { 

    let articleImage = document.querySelectorAll('.productImageI')
    let article = document.querySelectorAll('article')
    
    for(let i = 0; i < article.length; i++){
    
    article[i].addEventListener('mouseover', function(){
    
        articleImage[i].classList.add('active')

       
    })
    }

    for(let i = 0; i < article.length; i++){
    
        article[i].addEventListener('mouseout', function(){
        
            articleImage[i].classList.remove('active')
    
           
        })
        }

   
    
})


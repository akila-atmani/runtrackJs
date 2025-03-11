function showhide() {

    let button = document.getElementById('button');

    let article = document.getElementById('article');
    
    if (!article) {
        
        article = document.createElement('article');
        article.id = 'article';  // Ajoute un ID pour l'article
        article.innerText = "L'important n'est pas la chute, mais l'atterrissage.";  
        document.body.appendChild(article);  // Ajoute l'article au corps de la page
    } else {
        article.remove();
    }
}

document.getElementById('button').addEventListener('click', showhide);


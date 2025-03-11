function addOne() {

    let compteur = document.getElementById('compteur');
    
    let Compte = parseInt(compteur.innerText);
    compteur.innerText = Compte + 1;
}

document.getElementById('button').addEventListener('click', addOne);

function estPremier(n) {
    if (n <= 1) return false; 
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false; 
    }
    return true; 
}

function sommeNombresPremiers(a, b) {
    if (estPremier(a) && estPremier(b)) {
        return a + b; // Si les deux sont premiers, retourne leur somme
    } else {
        return false; // Si l'un des deux n'est pas premier, retourne false
    }
}


console.log(sommeNombresPremiers(7, 11)); 
console.log(sommeNombresPremiers(7, 4));  
console.log(sommeNombresPremiers(13, 19));

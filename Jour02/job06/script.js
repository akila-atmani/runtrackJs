// script.js

// La séquence du code Konami
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

// Tableau pour suivre les touches pressées
let inputSequence = [];

// Fonction pour vérifier si le code Konami est complet
function checkKonamiCode(event) {
    // Ajouter la touche pressée au tableau
    inputSequence.push(event.key); // Utilisation de event.key pour détecter la touche

    // Comparer la séquence d'entrée avec le code Konami
    if (inputSequence.length > konamiCode.length) {
        inputSequence.shift();  // Si la séquence devient trop longue, supprimer la première touche
    }

    // Vérifier si la séquence correspond à celle du code Konami
    if (inputSequence.join('') === konamiCode.join('')) {
        // Appliquer la classe 'konami-active' pour changer le style de la page
        document.body.classList.add('konami-active');
        console.log("Code Konami détecté!");
    }
}

// Ajouter un écouteur d'événements pour détecter les pressions de touches
window.addEventListener('keydown', checkKonamiCode);


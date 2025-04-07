// script.js
let score = 0;

// Récupérer les éléments HTML
const scoreElement = document.getElementById('score');
const crevette = document.getElementById('crevette');

// Fonction pour gérer le clic sur la crevette
crevette.addEventListener('click', function() {
    score++; // Augmenter le score à chaque clic
    scoreElement.textContent = score; // Mettre à jour l'affichage du score
});

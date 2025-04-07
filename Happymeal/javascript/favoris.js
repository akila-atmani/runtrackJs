// Fonction pour charger les favoris depuis le localStorage et les afficher
window.onload = function() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Vérifier si des favoris existent
    if (favorites.length === 0) {
        document.getElementById('favoris-container').innerHTML = '<p>Aucune recette ajoutée aux favoris.</p>';
    } else {
        // Charger les recettes depuis data.json
        loadRecipes(favorites);
    }
};

// Fonction pour charger les recettes en fonction des favoris
async function loadRecipes(favoriteNames) {
    try {
        const response = await fetch('/test/data/data.json'); // Assurez-vous que data.json est dans le bon chemin
        const data = await response.json();
        const recipes = data.recettes;

        // Filtrer les recettes qui sont dans les favoris
        const favoriteRecipes = recipes.filter(recipe => favoriteNames.includes(recipe.nom));

        // Afficher les recettes favorites
        displayFavoriteRecipes(favoriteRecipes);
    } catch (error) {
        console.error('Erreur lors du chargement des recettes:', error);
    }
}

// Fonction pour afficher les recettes favorites
function displayFavoriteRecipes(favoriteRecipes) {
    const favorisContainer = document.getElementById('favoris-container');
    favorisContainer.innerHTML = ''; // Vider le conteneur avant d'ajouter de nouvelles recettes

    favoriteRecipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('col-md-4', 'recipe-card');
        
        // Créer le HTML pour chaque recette favorite
        recipeCard.innerHTML = `
            <div class="card">
              
                <div class="card-body">
                    <h5 class="card-title">${recipe.nom}</h5>
                    <p class="card-text"><strong>Catégorie:</strong> ${recipe.categorie}</p>
                    <button class="btn btn-info" onclick="afficherDetailsRecette('${recipe.nom}')">Voir les détails</button>
                    <button class="btn btn-warning mt-2" onclick="removeFromFavorites('${recipe.nom}')">Retirer des favoris</button>
                </div>
            </div>
        `;
        
        favorisContainer.appendChild(recipeCard);
    });
}

// Fonction pour afficher les détails de la recette dans un modal
function afficherDetailsRecette(nom) {
    const recette = JSON.parse(localStorage.getItem('recettes')).find(r => r.nom === nom);

    // Mettre à jour le contenu du modal
    document.getElementById("recette-detail-title").textContent = recette.nom;
   
    document.getElementById("recette-detail-description").textContent = recette.description;

    // Afficher le modal
    document.getElementById("recette-detail-modal").style.display = 'flex';
}

// Fonction pour retirer une recette des favoris
function removeFromFavorites(recipeName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Retirer la recette des favoris
    favorites = favorites.filter(item => item !== recipeName);

    // Mettre à jour le localStorage avec les favoris modifiés
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Recharger la page pour mettre à jour l'affichage
    window.location.reload();
}

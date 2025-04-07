// Variables
const recipesPerPage = 9; // Nombre de recettes par page
let currentPage = 1;
let recettes = [];

// Fonction pour charger les recettes depuis data.json
async function loadRecipes() {
    try {
        const response = await fetch("./data/data.json"); // Assurez-vous que data.json est dans le bon chemin
        const data = await response.json();
        recettes = shuffleArray(data.recettes); // Mélanger les recettes
        displayRecipes(recettes, currentPage);
        afficherPagination(recettes, currentPage);
    } catch (error) {
        console.error('Erreur lors du chargement des recettes:', error);
    }
}

// Fonction pour mélanger le tableau des recettes (algorithme de Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Échanger les éléments
    }
    return array;
}

// Fonction pour afficher les recettes
function displayRecipes(recipes, currentPage) {
    const recettesContainer = document.getElementById('recettes-container');
    recettesContainer.innerHTML = ''; // Vider le conteneur avant d'ajouter de nouvelles recettes

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Calculer les indices de départ et de fin pour la pagination
    const start = (currentPage - 1) * recipesPerPage;
    const end = start + recipesPerPage;
    const recipesToDisplay = recipes.slice(start, end);

    recipesToDisplay.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('col-md-4', 'recipe-card');

        recipeCard.innerHTML = `
            <div class="card">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.nom}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.nom}</h5>
                    <button class="btn btn-info" onclick="afficherDetailsRecette('${recipe.nom}')">Voir les détails</button>
                    <button class="btn btn-warning mt-2" onclick="addToFavorites('${recipe.nom}')">
                        ${favorites.includes(recipe.nom) ? "Retirer des favoris" : "Ajouter aux favoris"}
                    </button>
                </div>
            </div>
        `;
        recettesContainer.appendChild(recipeCard);
    });
}

// Fonction pour afficher les détails d'une recette dans la modale
function afficherDetailsRecette(nomRecette) {
    const recette = recettes.find(r => r.nom === nomRecette);
    if (recette) {
        document.getElementById("modalTitle").textContent = recette.nom;
        document.getElementById("modalImage").src = recette.image;
        document.getElementById("modalDescription").textContent = `Temps de préparation: ${recette.temps_preparation}`;
        document.getElementById("modalCategorie").textContent = `Catégorie: ${recette.categorie}`;
        document.getElementById("modalEtapes").textContent = recette.etapes;

        const modalIngredients = document.getElementById("modalIngredients");
        modalIngredients.innerHTML = ''; // Vider la liste des ingrédients

        recette.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = `${ingredient.nom}: ${ingredient.quantite}`;

            const btnPlus = document.createElement('button');
            btnPlus.textContent = "+";
            btnPlus.classList.add('btn', 'btn-success', 'ms-2');
            btnPlus.onclick = () => ajouterAuPanier(ingredient);

            li.appendChild(btnPlus);
            modalIngredients.appendChild(li);
        });

        const modal = new bootstrap.Modal(document.getElementById('recetteModal'));
        modal.show();
    }
}

// Fonction pour ajouter une recette aux favoris
function addToFavorites(recipeName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(recipeName)) {
        favorites = favorites.filter(item => item !== recipeName);
        alert('Recette retirée des favoris.');
    } else {
        favorites.push(recipeName);
        alert('Recette ajoutée aux favoris !');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadRecipes();
}

// Fonction pour ajouter un ingrédient au panier
function ajouterAuPanier(ingredient) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    panier.push(ingredient);
    localStorage.setItem('panier', JSON.stringify(panier));
    document.getElementById('cart-count').textContent = panier.length;
    alert("Ingrédient ajouté au panier!");
}

// Fonction d'autocomplétion pour la barre de recherche
function searchRecipe() {
    let query = document.getElementById("searchBar").value.toLowerCase().trim();
    let suggestionsList = document.getElementById("suggestionsList");
    suggestionsList.innerHTML = ""; // Réinitialiser la liste

    if (query.length === 0) return;

    let suggestions = new Set();

    recettes.forEach(recipe => {
        if (recipe.nom.toLowerCase().includes(query)) {
            suggestions.add(recipe.nom);
        }
    });

    if (suggestions.size === 0) {
        let li = document.createElement("li");
        li.textContent = "Aucune suggestion";
        suggestionsList.appendChild(li);
    }

    suggestions.forEach(suggestion => {
        let li = document.createElement("li");
        li.textContent = suggestion;
        li.classList.add("suggestion-item");
        li.onclick = function () {
            document.getElementById("searchBar").value = suggestion;
            suggestionsList.innerHTML = "";
            afficherDetailsRecette(suggestion);
        };
        suggestionsList.appendChild(li);
    });
}

// Fonction pour afficher la pagination
function afficherPagination(recettes, currentPage) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ''; 

    const totalPages = Math.ceil(recettes.length / recipesPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("btn", "btn-secondary", "mx-1");
        if (i === currentPage) {
            pageButton.classList.add("active");
        }
        pageButton.onclick = () => {
            currentPage = i;
            displayRecipes(recettes, currentPage);
            afficherPagination(recettes, currentPage);
        };
        paginationContainer.appendChild(pageButton);
    }
}

// Appeler la fonction pour charger les recettes à l'initialisation
window.onload = loadRecipes;

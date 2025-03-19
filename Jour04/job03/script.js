async function filterPokemon() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value.toLowerCase();
    const type = document.getElementById('type').value;

    try {
        const response = await fetch('pokemon.json');
        const pokemons = await response.json();

        // Filtrer les Pokémon selon les critères
        const filteredPokemons = pokemons.filter(pokemon => {
            const matchesId = id ? pokemon.id == id : true;
            const matchesName = name ? pokemon.name.toLowerCase().includes(name) : true;
            const matchesType = type ? pokemon.type === type : true;
            return matchesId && matchesName && matchesType;
        });

        // Afficher les Pokémon filtrés
        displayPokemons(filteredPokemons);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

// Fonction pour afficher les Pokémon filtrés
function displayPokemons(pokemons) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Réinitialiser le contenu

    if (pokemons.length === 0) {
        resultDiv.innerHTML = 'Aucun Pokémon ne correspond à ces critères.';
        return;
    }
    pokemons.forEach(pokemon => {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon');
        pokemonDiv.innerHTML = `
            <strong>${pokemon.name}</strong> (ID: ${pokemon.id})
            <br>Type: ${pokemon.type}
        `;
        resultDiv.appendChild(pokemonDiv);
    });
}

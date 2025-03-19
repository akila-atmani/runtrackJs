async function filterPokemon() {
    const id = document.getElementById('id').value.trim();
    const name = document.getElementById('name').value.trim().toLowerCase();
    const type = document.getElementById('type').value;

    try {
        const response = await fetch('pokemon.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const pokemons = await response.json();

        // Filtrer les Pokémon selon les critères
        const filteredPokemons = pokemons.filter(pokemon => {
            const matchesId = id ? pokemon.id == id : true;
        
            // Vérifier si le nom correspond dans une des langues (français, anglais, japonais, chinois)
            const matchesName = name 
                ? Object.values(pokemon.name || {}).some(n => n.toLowerCase().includes(name)) 
                : true;

            // Vérifier si le type correspond
            const matchesType = type ? pokemon.type.includes(type) : true;

            return matchesId && matchesName && matchesType;
        });

        // Afficher les Pokémon filtrés
        displayPokemons(filteredPokemons);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        document.getElementById('result').innerHTML = 'Erreur de chargement des Pokémon.';
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
        const nameEn = pokemon.name?.english || 'Unknown Name';
        const nameFr = pokemon.name?.french || 'Nom inconnu';
        const nameJp = pokemon.name?.japanese || '不明な名前';
        const nameCn = pokemon.name?.chinese || '未知的名字';

        const types = pokemon.type.join(', '); // Affiche les types séparés par une virgule

        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon');
        pokemonDiv.innerHTML = `
            <strong>${nameFr} / ${nameEn} / ${nameJp} / ${nameCn}</strong> (ID: ${pokemon.id})
            <br>Type: ${types}
        `;
        resultDiv.appendChild(pokemonDiv);
    });
}



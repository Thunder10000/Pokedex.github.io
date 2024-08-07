async function buscarPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('No se encontró el Pokémon');
        }
        const data = await response.json();
        mostrarPokemon(data);
    } catch (error) {
        console.error('Error al buscar el Pokémon:', error.message);
        mostrarError(error.message);
    }
}

function mostrarPokemon(pokemon) {
    const pokemonData = document.getElementById('pokemonData');
    pokemonData.innerHTML = `
        <h2>${pokemon.name.toUpperCase()}</h2>
        <p><strong>ID:</strong> ${pokemon.id}</p>
        <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
        <p><strong>Tipo(s):</strong> ${obtenerTipos(pokemon.types)}</p>
        <img src="${pokemon.sprites.front_default}" alt="Imagen de ${pokemon.name}" class="pokemon-image">
    `;
}

function obtenerTipos(types) {
    return types.map(type => type.type.name).join(', ');
}

function mostrarError(message) {
    const pokemonData = document.getElementById('pokemonData');
    pokemonData.innerHTML = `<p>${message}</p>`;
}

function toggleSearch() {
    const searchContainer = document.getElementById('searchContainer');
    const searchIcon = document.querySelector('.search-icon');
    const title = document.getElementById('title');
    const infoBox = document.getElementById('infoBox');
    const backButton = document.getElementById('backButton');
    const pokedexTitle = document.getElementById('pokedexTitle');

    if (searchContainer.style.display === 'none') {
        searchContainer.style.display = 'flex';
        searchIcon.style.display = 'none';
        title.style.display = 'block';
        infoBox.style.display = 'none';
        backButton.style.display = 'block';
        pokedexTitle.style.display = 'none';
    } else {
        searchContainer.style.display = 'none';
        searchIcon.style.display = 'block';
        title.style.display = 'none';
        infoBox.style.display = 'flex';
        backButton.style.display = 'none';
        pokedexTitle.style.display = 'block';
        limpiarBusqueda();
    }
}

function limpiarBusqueda() {
    document.getElementById('pokemonName').value = '';
    document.getElementById('pokemonData').innerHTML = '';
}

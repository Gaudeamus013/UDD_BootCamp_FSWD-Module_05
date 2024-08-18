// URL base de la PokeAPI
const BASE_URL = 'https://pokeapi.co/api/v2';

// Obtiene un Pokémon por su ID
export const getPokemonById = async (id) => {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  return response.json();
};

// Obtiene Pokémon basado en la categoría seleccionada
export const getPokemonsByCategory = async (categoryId, criteria) => {
  switch (categoryId) {
    case 'number':
      return getPokemonsByNumberRange(criteria);
    case 'letter':
      return getPokemonsByLetter(criteria);
    case 'generation':
      return getPokemonsByGeneration(criteria);
    case 'type':
      return getPokemonsByType(criteria);
    case 'statistics':
      return getPokemonsByStatistics(criteria);
    default:
      throw new Error('Categoría no válida');
  }
};

// Obtiene Pokémon por un rango de números
const getPokemonsByNumberRange = async (range) => {
  const [start, end] = range.split('-').map(Number);
  const promises = [];

  // Crea promesas para cada número en el rango
  for (let i = start; i <= end; i++) {
    promises.push(fetch(`${BASE_URL}/pokemon/${i}`).then(res => res.json()));
  }

  return Promise.all(promises);
};

// Filtra Pokémon por letra inicial
const getPokemonsByLetter = async (letterRange) => {
  const [startLetter, endLetter] = letterRange.split('-');
  const allPokemonResponse = await fetch(`${BASE_URL}/pokemon?limit=10250`);
  const allPokemons = await allPokemonResponse.json();

  // Filtra Pokémon por la letra inicial
  const filteredPokemons = allPokemons.results.filter(pokemon => {
    const firstLetter = pokemon.name[0].toUpperCase();
    return firstLetter >= startLetter && firstLetter <= endLetter;
  });

  // Obtiene detalles de los Pokémon filtrados
  const pokemonDetails = await Promise.all(
    filteredPokemons.map(pokemon => fetch(pokemon.url).then(res => res.json()))
  );

  return pokemonDetails;
};

// Obtiene Pokémon por generación
const getPokemonsByGeneration = async (generation) => {
  const generationMapping = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9
  };

  const generationId = generationMapping[generation];
  const response = await fetch(`${BASE_URL}/generation/${generationId}`);
  const generationData = await response.json();

  // Obtiene detalles de los Pokémon en la generación seleccionada
  const pokemonDetails = await Promise.all(
    generationData.pokemon_species.map(species => 
      fetch(`${BASE_URL}/pokemon/${species.name}`).then(res => res.json()))
  );

  return pokemonDetails;
};

// Obtiene Pokémon por tipo
const getPokemonsByType = async (type) => {
  const response = await fetch(`${BASE_URL}/type/${type.toLowerCase()}`);
  const typeData = await response.json();

  // Obtiene detalles de los Pokémon por tipo
  const pokemonDetails = await Promise.all(
    typeData.pokemon.map(({ pokemon }) => 
      fetch(pokemon.url).then(res => res.json()))
  );

  return pokemonDetails;
};

// Obtiene Pokémon por estadísticas (ej. HP, Ataque)
const getPokemonsByStatistics = async (stat) => {
  const allPokemonResponse = await fetch(`${BASE_URL}/pokemon?limit=10250`);
  const allPokemons = await allPokemonResponse.json();

  const pokemonDetails = await Promise.all(
    allPokemons.results.map(pokemon => 
      fetch(pokemon.url).then(res => res.json()))
  );

  // Ordena Pokémon por la estadística seleccionada
  const sortedPokemons = pokemonDetails.sort((a, b) => {
    const statA = a.stats.find(s => s.stat.name === stat.toLowerCase()).base_stat;
    const statB = b.stats.find(s => s.stat.name === stat.toLowerCase()).base_stat;
    return statB - statA;
  });

  return sortedPokemons;
};
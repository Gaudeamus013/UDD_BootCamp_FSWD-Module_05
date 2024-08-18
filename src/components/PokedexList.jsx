import PokemonCard from './PokemonCard';

// Componente que muestra la lista de Pokémon en formato de cuadrícula
const PokedexList = ({ pokemons }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
    {pokemons.map(pokemon => (
      <PokemonCard key={pokemon.id} pokemon={pokemon} />
    ))}
  </div>
);

export default PokedexList;

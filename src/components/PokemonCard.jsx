import { Link } from 'react-router-dom';

// Componente de tarjeta de información de Pokémon con enlace a la página de detalles
const PokemonCard = ({ pokemon }) => (
  <Link to={`/pokemon/${pokemon.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden">
    <img
      src={pokemon.sprites.front_default}
      alt={pokemon.name}
      className="w-full h-32 object-contain bg-gray-200"
    />
    <div className="p-2 text-center">
      <h3 className="text-xl font-bold">{pokemon.name}</h3>
      <p>ID: {pokemon.id}</p>
    </div>
  </Link>
);

export default PokemonCard;

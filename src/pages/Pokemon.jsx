import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonById } from '../api/pokeAPI';

// Componente de la página de detalles de un Pokémon
const Pokemon = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    getPokemonById(pokemonId).then(setPokemon);
  }, [pokemonId]);

  if (!pokemon) return <div>Cargando...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <ul>
        <li>ID: {pokemon.id}</li>
        <li>Tipo: {pokemon.types.map(type => type.type.name).join(', ')}</li>
        <li>Puntos de Salud: {pokemon.stats.find(s => s.stat.name === 'hp').base_stat}</li>
        <li>Ataque: {pokemon.stats.find(s => s.stat.name === 'attack').base_stat}</li>
        <li>Defensa: {pokemon.stats.find(s => s.stat.name === 'defense').base_stat}</li>
        <li>Velocidad: {pokemon.stats.find(s => s.stat.name === 'speed').base_stat}</li>
      </ul>
    </div>
  );
};

export default Pokemon;

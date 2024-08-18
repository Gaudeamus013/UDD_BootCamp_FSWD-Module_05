import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonsByCategory } from '../api/pokeAPI';
import PokedexList from '../components/PokedexList';

// Componente principal que maneja la lógica de la categoría
const Category = () => {
  // Obtiene el parámetro de la URL que indica la categoría seleccionada
  const { categoryId } = useParams();

  // Estado para almacenar la subcategoría seleccionada por el usuario
  const [subCategory, setSubCategory] = useState('');

  // Estado para almacenar la lista de Pokémon filtrada por la categoría y subcategoría
  const [pokemons, setPokemons] = useState([]);

  // Efecto que se ejecuta cuando cambian la categoría o la subcategoría
  useEffect(() => {
    // Si hay una subcategoría seleccionada, realiza una llamada a la API
    if (subCategory) {
      getPokemonsByCategory(categoryId, subCategory).then(setPokemons);
      // La función `getPokemonsByCategory` devuelve una promesa, y cuando se resuelve, 
      // actualiza el estado `pokemons` con los resultados.
    }
  }, [categoryId, subCategory]); // El efecto depende de `categoryId` y `subCategory`

  // Función para manejar el cambio de la subcategoría seleccionada
  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value); // Actualiza el estado `subCategory` con el valor seleccionado
  };

  // Renderiza la interfaz de usuario
  return (
    <div className="p-4">
      {/* Muestra el nombre de la categoría en un formato amigable */}
      <h2 className="text-2xl font-bold">Categoría: {formatCategoryName(categoryId)}</h2>

      {/* Renderiza el menú de subcategorías basado en la categoría seleccionada */}
      {renderSubCategoryMenu(categoryId, handleSubCategoryChange)}

      {/* Renderiza la lista de Pokémon filtrada */}
      <PokedexList pokemons={pokemons} />
    </div>
  );
};

// Función para renderizar el menú de subcategorías basado en la categoría seleccionada
const renderSubCategoryMenu = (categoryId, handleSubCategoryChange) => {
  switch (categoryId) {
    case 'number':
      return (
        <select onChange={handleSubCategoryChange} className="mb-4 p-2 border rounded">
          <option value="">Seleccione un rango</option>
          <option value="001-151">001-151</option>
          <option value="152-251">152-251</option>
          <option value="252-386">252-386</option>
          <option value="387-493">387-493</option>
          <option value="494-649">494-649</option>
          <option value="650-721">650-721</option>
          <option value="722-809">722-809</option>
          <option value="810-905">810-905</option>
          <option value="906-1025">906-1025</option>
        </select>
      );
    case 'letter':
      return (
        <select onChange={handleSubCategoryChange} className="mb-4 p-2 border rounded">
          <option value="">Seleccione un rango de letras</option>
          <option value="A-G">A-G</option>
          <option value="H-R">H-R</option>
          <option value="S-Z">S-Z</option>
        </select>
      );
    case 'generation':
      return (
        <select onChange={handleSubCategoryChange} className="mb-4 p-2 border rounded">
          <option value="">Seleccione una generación</option>
          <option value="1">Generación 1</option>
          <option value="2">Generación 2</option>
          <option value="3">Generación 3</option>
          <option value="4">Generación 4</option>
          <option value="5">Generación 5</option>
          <option value="6">Generación 6</option>
          <option value="7">Generación 7</option>
          <option value="8">Generación 8</option>
          <option value="9">Generación 9</option>
        </select>
      );
    case 'type':
      return (
        <select onChange={handleSubCategoryChange} className="mb-4 p-2 border rounded">
          <option value="">Seleccione un tipo</option>
          <option value="normal">Normal</option>
          <option value="fighting">Lucha</option>
          <option value="flying">Volador</option>
          <option value="poison">Veneno</option>
          <option value="ground">Tierra</option>
          <option value="rock">Roca</option>
          <option value="bug">Bicho</option>
          <option value="ghost">Fantasma</option>
          <option value="steel">Acero</option>
          <option value="fire">Fuego</option>
          <option value="water">Agua</option>
          <option value="grass">Planta</option>
          <option value="electric">Eléctrico</option>
          <option value="psychic">Psíquico</option>
          <option value="ice">Hielo</option>
          <option value="dragon">Dragón</option>
          <option value="dark">Siniestro</option>
          <option value="fairy">Hada</option>
        </select>
      );
    case 'statistics':
      return (
        <select onChange={handleSubCategoryChange} className="mb-4 p-2 border rounded">
          <option value="">Seleccione una estadística</option>
          <option value="hp">Puntos de Salud (PS)</option>
          <option value="attack">Ataque</option>
          <option value="defense">Defensa</option>
          <option value="special-attack">Ataque Especial</option>
          <option value="special-defense">Defensa Especial</option>
          <option value="speed">Velocidad</option>
          <option value="total">Total</option>
        </select>
      );
    default:
      return null; // Si no hay una categoría válida, no se muestra nada
  }
};

// Función para formatear el nombre de la categoría para la visualización
const formatCategoryName = (categoryId) => {
  switch (categoryId) {
    case 'number':
      return 'Por Número';
    case 'letter':
      return 'Por Letra Inicial';
    case 'generation':
      return 'Por Generación';
    case 'type':
      return 'Por Tipo';
    case 'statistics':
      return 'Por Estadísticas';
    default:
      return categoryId; // Si no hay una coincidencia, devuelve el ID tal cual
  }
};

export default Category;

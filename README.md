![Logo](https://github.com/Gaudeamus013/UDD_BootCamp_FSWD/blob/main/images/banner.png)

# Pokemon Pokedex

Este proyecto es una Pokedeck interactiva construida con React, Vite, y TailwindCSS. La aplicación consume la [PokeAPI](https://pokeapi.co/) para proporcionar información sobre los Pokémon, permitiendo explorar Pokémon por categorías como número, letra inicial, generación, tipo y estadísticas. 

## Estructura del Proyecto

```plaintext
pokemon-pokedex/
│
├── .env
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── index.html
│
├── src/
│ ├── api/
│ │ └── pokeAPI.js
│ ├── components/
│ │ ├── Header.jsx
│ │ ├── Footer.jsx
│ │ ├── PokedexList.jsx
│ │ ├── PokemonCard.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Category.jsx
│ │ ├── Pokemon.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── ErrorBoundary.jsx
│
└── server.js
```

### Archivos y Carpetas

- **.env**: Configuración del entorno incluyendo el puerto del servidor.
- **package.json**: Información del proyecto y sus dependencias.
- **postcss.config.js**: Configuración para PostCSS.
- **tailwind.config.js**: Configuración personalizada de TailwindCSS.
- **vite.config.js**: Configuración del bundler Vite.
- **index.html**: Punto de entrada de la aplicación.

#### Carpeta `src/`

- **api/pokeAPI.js**: Módulo que maneja todas las interacciones con la PokeAPI.
  
- **components/**: Contiene componentes reutilizables como:
  - **Header.jsx**: Barra de navegación de la aplicación.
  - **Footer.jsx**: Pie de página con información adicional.
  - **PokedexList.jsx**: Lista que muestra los Pokémon filtrados.
  - **PokemonCard.jsx**: Tarjeta individual que muestra la información básica de un Pokémon.

- **pages/**: Componentes que representan páginas individuales:
  - **Home.jsx**: Página principal que da la bienvenida y permite seleccionar categorías.
  - **Category.jsx**: Página que muestra Pokémon filtrados según la categoría seleccionada.
  - **Pokemon.jsx**: Página de detalles de un Pokémon individual.

- **App.jsx**: Componente raíz que configura las rutas y la estructura general de la aplicación.
- **main.jsx**: Punto de entrada de React.
- **ErrorBoundary.jsx**: Componente para manejar errores en la interfaz.

- **server.js**: Servidor Express que sirve la aplicación y puede manejar las peticiones API.

## Dependencias del Proyecto

En `package.json` se incluyen las siguientes dependencias:

- dotenv: Para cargar las variables de entorno desde un archivo `.env`.
- express: Para manejar el servidor y rutas API si se implementa un backend.
- react: Librería principal para construir la interfaz de usuario.
- react-dom: Permite montar componentes de React en el DOM.
- react-router-dom: Manejo de rutas y navegación en la aplicación.
- nodemon: Herramienta para reiniciar automáticamente el servidor en desarrollo.

## Instrucciones de Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/tu-usuario/pokemon-pokedex.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd pokemon-pokedex
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Configura el archivo `.env` con el puerto deseado:
    ```
    VITE_PORT=3000
    ```

5. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

## Estructura de Archivos Clave

### `src/pages/Category.jsx`

El archivo `Category.jsx` es responsable de manejar la visualización de los Pokémon según la categoría seleccionada. 

#### Importaciones y Configuración Inicial
```javascript
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonsByCategory } from '../api/pokeAPI';
import PokedexList from '../components/PokedexList';
```

## Comentarios del Código

1.  `src/api/pokeAPI.js`

Este archivo contiene funciones para interactuar con la PokeAPI.

```javascript
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
```

2.  `src/components/Footer.jsx`

El componente Footer renderiza el pie de página de la aplicación.

```javascript
// Componente de pie de página
const Footer = () => (
    <footer className="bg-gray-800 text-white text-center p-4">
      <p>© 2024 Pokedex by Gaudeamus13</p>
    </footer>
  );
  
  export default Footer;
```

3.  `src/components/Header.jsx`

El componente Header renderiza la cabecera de la aplicación.

```javascript
import { Link } from 'react-router-dom';

// Componente de cabecera con navegación
const Header = () => (
  <header className="bg-red-500 text-white p-4">
    <h1 className="text-3xl font-bold text-center">Pokedex</h1>
    <nav className="mt-4 text-center">
      <Link to="/" className="px-4">| Inicio |</Link>
      <Link to="/category/number" className="px-4">| Por Número |</Link>
      <Link to="/category/letter" className="px-4">| Por Letra |</Link>
      <Link to="/category/generation" className="px-4">| Por Generación |</Link>
      <Link to="/category/type" className="px-4">| Por Tipo |</Link>
      <Link to="/category/statistics" className="px-4">| Por Estadísticas |</Link>
    </nav>
  </header>
);

export default Header;
```

4. `src/components/PokedexList.jsx`
5. 
El componente PokedexList renderiza una lista de tarjetas de Pokémon.

```javascript
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
```

5. `src/components/PokemonCard.jsx`

El componente PokemonCard renderiza la tarjeta de un Pokémon individual.

```javascript
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
```

6. `src/pages/Category.jsx`

El componente Category permite seleccionar subcategorías para filtrar Pokémon.

```javascript
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
```

7. `src/pages/Home.jsx`
   
El componente Home renderiza la página de inicio de la aplicación.

```javascript
// Componente principal de la página de inicio
const Home = () => (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold">Bienvenido a la Pokedex</h2>
      <p>Explora la colección de Pokémon por categorías.</p>
    </div>
  );
  
  export default Home;
```

8. `src/pages/Pokemon.jsx`
   
El componente Pokemon renderiza la página de detalles de un Pokémon.

```javascript
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
```

9. `src/App.jsx`
    
El componente App es el componente raíz que define las rutas de la aplicación.

```javascript
// Importa React y las rutas de React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importa las páginas de secciones necesarias
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
// Importa las páginas y componentes necesarios
import Category from './pages/Category';
import Pokemon from './pages/Pokemon';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    // Envuelve la aplicación en el ErrorBoundary para capturar errores de renderizado
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <ErrorBoundary>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/pokemon/:pokemonId" element={<Pokemon />} />
            </Routes>
          </main>
        </ErrorBoundary>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
```

10. `src/main.jsx`
    
El archivo `main.jsx` es el punto de entrada de la aplicación.

```javascript
// Importa React y ReactDOM para manejar rutas en la aplicación
import React from 'react';
import ReactDOM from 'react-dom/client';
// Importa el componente principal de la aplicación y los estilos globales
import App from './App';
import './index.css';

// Renderiza la aplicación principal en el div con id "root" dentro del archivo index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

11. `src/ErrorBoundary.jsx`
    
El componente ErrorBoundary se encarga de capturar y manejar errores en la aplicación.

```javascript
import { Component } from 'react';

// Componente que captura errores de renderizado
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Algo salió mal.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## Configuración de TailwindCSS

El archivo `tailwind.config.js` incluye la configuración básica de TailwindCSS para el proyecto.

```javascript
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Configuración del servidor

`server.js` es el archivo del servidor (opcional) que puede ser utilizado si se desea manejar rutas del lado del servidor o servir la aplicación desde un backend.

```javascript
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
```

## Archivo `.env`
El archivo `.env` almacena variables de entorno para la configuración del proyecto, como el puerto del servidor.

```plaintext
PORT=3000
BASE_URL=https://pokeapi.co/api/v2
```

## Autor

Este proyecto fue creado por [Gaudeamus013](https://github.com/Gaudeamus013).

## Licencia

Este proyecto está bajo la licencia MIT.


### Resumen

Este `README.md` documenta de manera detallada la estructura del proyecto, los archivos clave, y proporciona instrucciones para la instalación y uso. Está diseñado para que cualquier desarrollador pueda entender rápidamente el propósito del proyecto y cómo contribuir a él.

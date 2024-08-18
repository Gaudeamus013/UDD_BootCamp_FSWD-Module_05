import { Link } from 'react-router-dom';

// Componente de cabecera con navegación
const Header = () => (
  <header className="bg-red-500 text-white p-4">
    <h1 className="text-3xl font-bold text-center">Pokedex</h1>
    <nav className="mt-4 text-center">
      <Link to="/" className="px-4">| Inicio  |</Link>
      <Link to="/category/number" className="px-4">|  Por Número  |</Link>
      <Link to="/category/letter" className="px-4">|  Por Letra |</Link>
      <Link to="/category/generation" className="px-4">|  Por Generación  |</Link>
      <Link to="/category/type" className="px-4">|  Por Tipo  |</Link>
      <Link to="/category/statistics" className="px-4">|  Por Estadísticas  |</Link>
    </nav>
  </header>
);

export default Header;

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

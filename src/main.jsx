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

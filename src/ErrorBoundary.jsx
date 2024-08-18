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

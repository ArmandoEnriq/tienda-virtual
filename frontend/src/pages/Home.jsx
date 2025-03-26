import { Link } from 'react-router-dom';
import '../styles/Home.css'; // Archivo de estilos específico

export const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Bienvenido a nuestra Tienda Virtual</h1>
        <p>Descubre los mejores productos al mejor precio</p>
        <Link to="/productos" className="cta-button">Ver Productos</Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <h2>Envío Gratis</h2>
          <p>En compras mayores a $100</p>
        </div>
        <div className="feature-card">
          <h2>Garantía</h2>
          <p>30 días de devolución</p>
        </div>
        <div className="feature-card">
          <h2>Soporte 24/7</h2>
          <p>Asistencia personalizada</p>
        </div>
      </section>
    </div>
  );
};
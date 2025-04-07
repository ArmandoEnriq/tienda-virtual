import { Link } from 'react-router-dom'; // Para cambios de pagina
import '../styles/Home.css'; // Archivo de estilos específico
import { useAuth } from '../context/AuthContext'; // Contexto del inicio de sesion

export const Home = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="home-container">
      <section className="hero">
      {isAuthenticated ? ( // Si estas logueado te saldra carrito y cerrar sesion
            <>
            <h1>Bienvenido a nuestra Tienda Virtual como {localStorage.getItem("rol")}</h1>
            </>
              ) : ( // sino te saldra iniciar sesion
                <h1>Bienvenido a nuestra Tienda Virtual</h1>
          )}
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
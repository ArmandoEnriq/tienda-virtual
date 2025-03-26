import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css'; // Archivo de estilos que crearemos después

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">¡Oops! Página no encontrada</h1>
        <p className="error-message">
          La página que estás buscando no existe o ha sido movida.
          <br />
          Por favor, verifica la URL o navega a otra sección.
        </p>
        
        <div className="action-buttons">
          <button 
            onClick={() => navigate(-1)} 
            className="back-button"
          >
            &larr; Volver atrás
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="home-button"
          >
            Ir al inicio
          </button>
        </div>
      </div>
      
      <div className="not-found-illustration">
        {/* Puedes usar un SVG o imagen */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          {/* Ilustración SVG de error - puedes personalizar */}
          <path d="M250,50a200,200 0 1,0 0,400a200,200 0 0,0 0-400z" fill="#f8f9fa"/>
          <path d="M250,150l50,150h-100z" fill="#ff6b6b"/>
          <circle cx="220" cy="120" r="20" fill="#343a40"/>
          <circle cx="280" cy="120" r="20" fill="#343a40"/>
        </svg>
      </div>
    </div>
  );
};

export default NotFound;
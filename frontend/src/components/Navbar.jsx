import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Contexto del carrito
import { useAuth } from '../context/AuthContext'; // Contexto del inicio de sesion

export const Navbar = () => {
    const { cart } = useCart();
    const { isAuthenticated } = useAuth();
    return (
      <nav className="navbar">
        <Link to="/"><h1>Tienda Virtual</h1></Link>
        <div className="navbar-links">
          <Link to="/productos">Productos</Link>
          {isAuthenticated ? ( // Si estas logueado te saldra carrito y cerrar sesion
            <>
              <Link to="/cart">Carrito ({cart.length})</Link>
              <button onClick={() => { localStorage.removeItem('token'); window.location.reload();}}>Cerrar Sesión</button>
            </>
              ) : ( // sino te saldra iniciar sesion
              <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    );
  };
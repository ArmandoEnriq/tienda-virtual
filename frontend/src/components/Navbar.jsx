import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Contexto del carrito
import { useAuth } from '../context/AuthContext'; // Contexto del inicio de sesion

export const Navbar = () => {
    const { cart } = useCart();
    const { isAuthenticated } = useAuth();
    const isAdmin = isAuthenticated && ['admin', 'encargado'].includes(localStorage.getItem('rol')); // preguntamos si esta autenticado y que su rol sea admin o encargado
    return (
      <nav className="navbar">
        <Link to="/"><h1>Tienda Virtual</h1></Link>
        <div className="navbar-links">
          <Link to="/productos">Productos</Link>
          {isAuthenticated ? ( // Si estas logueado te saldra carrito y cerrar sesion
            <> {/*Una divicion que no usa del DOM para evitar muchos div*/}
             {isAdmin && ( // Si tu rol es admin o encargado te saldra administrar
              <Link to="/admin/products" className="admin-link"> Administrar </Link>
              )}
              <Link to="/cart">Carrito ({cart.length})</Link>
              <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('rol'); window.location.reload();}}>Cerrar Sesión</button>
            </>
              ) : ( // sino te saldra iniciar sesion
              <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    );
  };
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
    const { cart } = useCart();
    return (
      <nav className="navbar">
        <Link to="/"><h1 className="navbar-title">Tienda Virtual</h1></Link>
        <div className="navbar-links">
          <Link to="/productos">Productos</Link>
          <Link to="/login">Login</Link>
          <Link to="/cart" className="cart-link">
            Carrito ({cart.length})
          </Link>
        </div>
      </nav>
    );
  };
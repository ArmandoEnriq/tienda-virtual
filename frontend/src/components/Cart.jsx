import { useCart } from '../context/CartContext'; // Usamos el contexto global para el carrito
import '../styles/Cart.css';

export const Cart = () => {
  const { cart, removeFromCart } = useCart(); // Del contexto usamos el carrito y la funcion eliminar

  // Regresa el carrito con los elementos dentro de el
  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imagen} alt={item.nombre} />
              <h3>{item.nombre}</h3>
              <p>${item.precio}</p>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
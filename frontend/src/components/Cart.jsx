import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Usamos el contexto
import '../styles/Cart.css';

export const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart, getCartTotal } = useCart(); // Funciones que ocuparemos del contexto

  // Función para obtener la imagen segura (maneja ambos formatos de carrito)
  const getItemImage = (item) => { // Se usa item.nombre si el formato es directo item = { nombre: "Zapatos", precio: 50 } / se usa item.product?.nombre si esta dentro item = { product: { nombre: "Camisa" }, quantity: 2 } y no da directo el error para no romper la aplicacion
    return item.imagen || item.product?.imagen || 'https://via.placeholder.com/150';
  };

  // Función para obtener el nombre seguro
  const getItemName = (item) => {
    return item.nombre || item.product?.nombre || 'Producto sin nombre';
  };

  // Función para obtener el precio seguro
  const getItemPrice = (item) => {
    return item.precio || item.product?.precio || 0;
  };

  // Función para obtener la cantidad (default 1 si no existe)
  const getItemQuantity = (item) => {
    return item.quantity || 1;
  };

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? ( // Si el carrito esta vacio 
        <div className="cart-empty">
          <p>No hay productos en tu carrito</p>
          <Link to="/productos" className="btn-primary">Ver Productos</Link>
        </div> // solo dice que no hay productos y te da el link hacia productos
      ) : ( // Si no esta vacio muentra los productos
        <> {/* Los fragmentos <> </> (también conocidos como React.Fragment) se utilizan en React para agrupar múltiples elementos hijos sin necesidad de agregar un nodo adicional al DOM */}
          <div className="cart-items">
            {cart.map((item) => ( // Recorremos el carrito con los productos
              <div key={item.id || item.productId} className="cart-item">
                <img src={getItemImage(item)} alt={getItemName(item)} className="cart-item-image"/>
                <div className="cart-item-details">
                  <h3>{getItemName(item)}</h3>
                  <p>${getItemPrice(item)} x {getItemQuantity(item)}</p>
                  <p>Subtotal: ${(getItemPrice(item) * getItemQuantity(item)).toFixed(2)}</p>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => removeFromCart(item.id || item.productId)} className="btn-quantity"> - </button>
                  <span>{getItemQuantity(item)}</span>
                  <button onClick={() => addToCart(item.product || item)} className="btn-quantity"> + </button>
                  <button onClick={() => removeFromCart(item.id || item.productId, true)} className="btn-remove">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>${getCartTotal()}</span>
            </div>
            <div className="cart-actions">
              <Link to="/checkout"> <button className="btn-checkout">Proceder al Pago</button> </Link> {/*Al darle realizar pago te mandara al resumen de compra para checkout */}
              <button onClick={clearCart} className="btn-clear">Vaciar Carrito</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
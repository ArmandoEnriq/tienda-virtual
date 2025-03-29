import { useCart } from '../context/CartContext'; // Contexto del carrito
import '../styles/Checkout.css';

export const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();

const pago =() => {
  alert('¡Compra realizada con éxito!');
  clearCart();
}

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
    <div className="checkout-container">
      <h2>Resumen de Compra</h2>
      <div className="checkout-summary">
        {cart.map(item => (
          <div key={item.id || item.productId} className="checkout-item">
            <img src={getItemImage(item)} alt={getItemName(item)} />
            <h3>{getItemName(item)}</h3>
            <p>${getItemPrice(item)} ({getItemQuantity(item)})</p>
          </div>
        ))}
      </div>
      <div className="checkout-total">
        <h3>Total: ${getCartTotal()}</h3>
      </div>
      <button onClick={pago} className="checkout-button">Pagar Ahora</button>
    </div>
  );
};
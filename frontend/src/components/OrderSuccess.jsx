import { Link } from 'react-router-dom';
import '../styles/OrderSuccess.css'

export const OrderSuccess = () => {
  return (
    <div className="order-success">
      <h2>¡Pedido realizado con éxito!</h2>
      <p>Gracias por tu compra. Hemos recibido tu pedido correctamente.</p>
      <div className="actions">
        <Link to="/orders" className="btn-primary">Ver mis pedidos</Link>
        <Link to="/productos" className="btn-secondary">Seguir comprando</Link>
      </div>
    </div>
  );
};
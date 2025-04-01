import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserOrders } from '../api/api';
import '../styles/Orders.css';

export const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
        console.log(user)
      if (user) {
        try {
          const response = await getUserOrders(user);
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchOrders();
  }, [user]);

  if (loading) return <div>Cargando historial...</div>;

  return (
    <div className="order-history">
      <h2>Mis Pedidos</h2>
      {orders.length === 0 ? (
        <p>No hay pedidos registrados</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Pedido # {order.id}</h3>
                <p>Fecha: {new Date(order.fecha).toLocaleDateString()}</p>
                <p>Total: ${order.total}</p>
              </div>
              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.imagen} alt={item.nombre} />
                    <div>
                      <h4>{item.nombre}</h4>
                      <p>Cantidad: {item.cantidad}</p>
                      <p>Precio unitario: ${item.precio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/api';
import { useCart } from '../context/CartContext'; // Usamos el contexto global del carrito
import '../styles/Products.css';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // Del contexto global usamos la funcion de agregar

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>Nuestros Productos</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imagen} alt={product.nombre} />
            <h3>{product.nombre}</h3>
            <p>${product.precio}</p>
            <button onClick={() => addToCart(product)}>Añadir al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};
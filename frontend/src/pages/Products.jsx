import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/api';
import './Products';

export const Products = () => {
  const [products, setProducts] = useState([]);

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
            <button>Añadir al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../api/api';
import '../styles/AdminProducts.css';

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await fetchProducts();
      setProducts(response.data);
    };
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <div className="admin-products-container">
      <h2>Gestión de Productos</h2>
      <Link to="/admin/products/new" className="add-product-btn">
        Añadir Producto
      </Link>
      <div className="products-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imagen || 'https://cdn-icons-png.freepik.com/512/12048/12048902.png'} alt={product.nombre} />
            <h3>{product.nombre}</h3>
            <p>${product.precio}</p>
            <div className="product-actions">
              <Link to={`/admin/products/edit/${product.id}`} className="edit-btn">Editar</Link>
              <button onClick={() => handleDelete(product.id)} className="delete-btn">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
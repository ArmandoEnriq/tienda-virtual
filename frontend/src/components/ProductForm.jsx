import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct,fetchProduct } from '../api/api';
import '../styles/ProductForm.css';

export const ProductForm = () => {
  const { id } = useParams(); // Extraemos el id de la url
  const navigate = useNavigate(); // Para uso de paginacion 
  const [product, setProduct] = useState({ // manejo de estados
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: '',
    imagen: ''
  });

  useEffect(() => {
    if (id) {
      const loadProduct = async () => {
        const response = await fetchProduct(id);
        setProduct({
          nombre: response.data.nombre || '',
          descripcion: response.data.descripcion || '',
          precio: response.data.precio || '',
          cantidad: response.data.cantidad || '',
          imagen: response.data.imagen || ''
        });
      };
      loadProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(id, product);
      } else {
        await createProduct(product);
      }
      navigate('/admin/products');
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{id ? 'Editar Producto' : 'Añadir Producto'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={product.nombre} onChange={(e) => setProduct({...product, nombre: e.target.value})} required />
        </label>
        
        <label>
          Descripción:
          <textarea value={product.descripcion} onChange={(e) => setProduct({...product, descripcion: e.target.value})} />
        </label>
        
        <label>
          Precio:
          <input type="number" step="0.01" value={product.precio} onChange={(e) => setProduct({...product, precio: e.target.value})} required />
        </label>
        
        <label>
          Cantidad:
          <input type="number" value={product.cantidad} onChange={(e) => setProduct({...product, cantidad: e.target.value})} required />
        </label>
        
        <button type="submit" className="save-btn">
          {id ? 'Actualizar' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};
import axios from 'axios'; // Usamos lia libreria axios para contas http

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajusta según tu backend
});

// Interceptor para añadir el token de autorización a las peticiones
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Asume que guardas el token en localStorage
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Ruta de login
export const loginUser = (credentials) => API.post('/users/login', credentials);
// Ruta Register
export const registerUser = (userData) => API.post('/users/register', userData);
// Rutas Productos
export const fetchProducts = () => API.get('/products');
export const fetchProduct = (id) => API.get(`/products/${id}`);
// Rutas de creacion modificacion y eliminacion de productos
export const createProduct = (product) => API.post('/products', product);
export const updateProduct = (id, product) => API.put(`/products/${id}`, product);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const createOrder = (orders) => API.post('/orders', orders);
export const getUserOrders = (userId) => API.get(`/orders/user/${userId}`);
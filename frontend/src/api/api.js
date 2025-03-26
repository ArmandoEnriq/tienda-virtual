import axios from 'axios'; // Usamos lia libreria axios para contas http

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajusta según tu backend
});

export const fetchProducts = () => API.get('/products');
export const loginUser = (credentials) => API.post('/users/login', credentials);
export const registerUser = (userData) => API.post('/users/register', userData);

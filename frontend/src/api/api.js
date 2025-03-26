import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajusta según tu backend
});

export const fetchProducts = () => API.get('/products');
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css';
import { CartProvider } from './context/CartContext'; // Asegúrate de que la ruta es correcta
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'; // Cambia la importación

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <CartProvider>
    <App />
    </CartProvider>
    </AuthProvider>
  </StrictMode>,
)

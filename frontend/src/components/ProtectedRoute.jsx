import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Usamos el contexto de inicio de sesion guardado de token

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated } = useAuth();

  // Redirige a login si no está autenticado
  if (!isAuthenticated) { // pregunta sino esta autentificado
    // Usamos Navigate con replace para evitar problemas de historial
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />; // Evitamos que el usuario pueda regresar atras y lo regresa a login (ejemplo cerro sesion y quiere volver)
  }
 // Redirige a products si el rol no coincide
  if (allowedRoles && !allowedRoles.includes(localStorage.getItem('rol'))) { // verificamos el rol que se fuardo al iniciar sesion
    return <Navigate to="/productos" replace />; // O a una página de "acceso denegado"
  }

  return children;
};
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(); // Creamos el contexto para guardar la sesion del usuario

export function AuthProvider({ children }) {
  const [user, setuser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => { // Cambio de estado verdadero o falso para verificar token
    return !!localStorage.getItem('token'); // El !! es un patrón común en JavaScript para forzar la conversión a booleano 
  });

  const login = (data) => { // Si se inicia sesion guardamos el token en localStore
    setuser(data.id)
    localStorage.setItem('token', data.token); // Guardamos el token 
    localStorage.setItem('rol', data.rol); // Guardamos el rol
    setIsAuthenticated(true); // decimos que es verdadero que hay una sesion
  };

  const logout = () => { // Si se cierra sesion eliminamos el token de LocalStore
    localStorage.removeItem('token');
    setIsAuthenticated(false); // Decimos que es falso que hay una sesion
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}